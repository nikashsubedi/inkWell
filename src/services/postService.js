import { supabase } from '../lib/supabase';

// Post Service for Supabase operations
export class PostService {
  // Get all published posts with author and tags
  static async getAllPosts({ 
    limit = 10, 
    offset = 0, 
    sortBy = 'created_at', 
    sortOrder = 'desc',
    tag = null,
    search = null 
  } = {}) {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url
          ),
          post_tags (
            tags (
              id,
              name,
              slug,
              color
            )
          )
        `)
        .eq('status', 'published')
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + limit - 1);

      // Add tag filter if specified
      if (tag) {
        query = query.contains('post_tags.tags.slug', [tag]);
      }

      // Add search filter if specified
      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Get a single post by slug
  static async getPostBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url,
            bio
          ),
          post_tags (
            tags (
              id,
              name,
              slug,
              color
            )
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      // Increment view count
      await this.incrementViewCount(data.id);

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching post:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Get posts by author
  static async getPostsByAuthor(authorId, includePrivate = false) {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url
          ),
          post_tags (
            tags (
              id,
              name,
              slug,
              color
            )
          )
        `)
        .eq('author_id', authorId)
        .order('created_at', { ascending: false });

      if (!includePrivate) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching author posts:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Create a new post
  static async createPost(postData) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...postData,
          reading_time: this.calculateReadingTime(postData.content)
        }])
        .select()
        .single();

      if (error) throw error;

      // Add tags if provided
      if (postData.tags && postData.tags.length > 0) {
        await this.addTagsToPost(data.id, postData.tags);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error creating post:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Update an existing post
  static async updatePost(postId, updates) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          ...updates,
          reading_time: updates.content ? this.calculateReadingTime(updates.content) : undefined
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      // Update tags if provided
      if (updates.tags) {
        await this.updatePostTags(postId, updates.tags);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating post:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Delete a post
  static async deletePost(postId) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error deleting post:', error.message);
      return { error: error.message };
    }
  }

  // Like/Unlike a post
  static async togglePostLike(postId, userId) {
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);

        if (error) throw error;

        // Decrement like count
        await this.updateLikeCount(postId, -1);
        
        return { liked: false, error: null };
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert([{ post_id: postId, user_id: userId }]);

        if (error) throw error;

        // Increment like count
        await this.updateLikeCount(postId, 1);
        
        return { liked: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling post like:', error.message);
      return { liked: false, error: error.message };
    }
  }

  // Bookmark/Unbookmark a post
  static async toggleBookmark(postId, userId) {
    try {
      // Check if already bookmarked
      const { data: existingBookmark } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (existingBookmark) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);

        if (error) throw error;
        
        return { bookmarked: false, error: null };
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert([{ post_id: postId, user_id: userId }]);

        if (error) throw error;
        
        return { bookmarked: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error.message);
      return { bookmarked: false, error: error.message };
    }
  }

  // Upload post image
  static async uploadPostImage(file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);

      return { url: publicUrl, error: null };
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return { url: null, error: error.message };
    }
  }

  // Helper methods
  static calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  static async incrementViewCount(postId) {
    try {
      await supabase.rpc('increment_view_count', { post_id: postId });
    } catch (error) {
      console.error('Error incrementing view count:', error.message);
    }
  }

  static async updateLikeCount(postId, increment) {
    try {
      await supabase.rpc('update_like_count', { 
        post_id: postId, 
        increment_by: increment 
      });
    } catch (error) {
      console.error('Error updating like count:', error.message);
    }
  }

  static async addTagsToPost(postId, tags) {
    try {
      // First, ensure tags exist
      const tagPromises = tags.map(async (tagName) => {
        const slug = tagName.toLowerCase().replace(/\s+/g, '-');
        
        const { data, error } = await supabase
          .from('tags')
          .upsert([{ name: tagName, slug }])
          .select()
          .single();

        if (error) throw error;
        return data;
      });

      const createdTags = await Promise.all(tagPromises);

      // Then, link tags to post
      const postTagPromises = createdTags.map(tag => 
        supabase
          .from('post_tags')
          .insert([{ post_id: postId, tag_id: tag.id }])
      );

      await Promise.all(postTagPromises);
    } catch (error) {
      console.error('Error adding tags to post:', error.message);
    }
  }

  static async updatePostTags(postId, tags) {
    try {
      // Remove existing tags
      await supabase
        .from('post_tags')
        .delete()
        .eq('post_id', postId);

      // Add new tags
      if (tags.length > 0) {
        await this.addTagsToPost(postId, tags);
      }
    } catch (error) {
      console.error('Error updating post tags:', error.message);
    }
  }
}

// Export default
export default PostService;
