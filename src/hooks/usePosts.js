import { useState, useEffect } from 'react';
import { PostService } from '../services/postService';
import { useAuth } from '../context/SupabaseAuthContext';

export const usePosts = (options = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const {
    limit = 10,
    sortBy = 'created_at',
    sortOrder = 'desc',
    tag = null,
    search = null,
    authorId = null
  } = options;

  useEffect(() => {
    fetchPosts();
  }, [limit, sortBy, sortOrder, tag, search, authorId]);

  const fetchPosts = async (offset = 0) => {
    try {
      setLoading(true);
      setError(null);

      let result;
      if (authorId) {
        result = await PostService.getPostsByAuthor(authorId);
      } else {
        result = await PostService.getAllPosts({
          limit,
          offset,
          sortBy,
          sortOrder,
          tag,
          search
        });
      }

      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await PostService.getAllPosts({
        limit,
        offset: posts.length,
        sortBy,
        sortOrder,
        tag,
        search
      });

      if (result.error) {
        setError(result.error);
      } else {
        setPosts(prev => [...prev, ...(result.data || [])]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const createPost = async (postData) => {
    try {
      const result = await PostService.createPost({
        ...postData,
        author_id: user.id
      });

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        // Refresh posts after creation
        await fetchPosts();
        return { success: true, data: result.data };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updatePost = async (postId, updates) => {
    try {
      const result = await PostService.updatePost(postId, updates);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        // Update the post in the local state
        setPosts(prev => 
          prev.map(post => 
            post.id === postId ? { ...post, ...result.data } : post
          )
        );
        return { success: true, data: result.data };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deletePost = async (postId) => {
    try {
      const result = await PostService.deletePost(postId);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        // Remove the post from local state
        setPosts(prev => prev.filter(post => post.id !== postId));
        return { success: true };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleLike = async (postId) => {
    if (!user) {
      setError('You must be logged in to like posts');
      return { success: false, error: 'Authentication required' };
    }

    try {
      const result = await PostService.togglePostLike(postId, user.id);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        // Update the post in local state
        setPosts(prev => 
          prev.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  like_count: result.liked 
                    ? post.like_count + 1 
                    : post.like_count - 1 
                } 
              : post
          )
        );
        return { success: true, liked: result.liked };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleBookmark = async (postId) => {
    if (!user) {
      setError('You must be logged in to bookmark posts');
      return { success: false, error: 'Authentication required' };
    }

    try {
      const result = await PostService.toggleBookmark(postId, user.id);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        return { success: true, bookmarked: result.bookmarked };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const uploadImage = async (file) => {
    try {
      const result = await PostService.uploadPostImage(file);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      } else {
        return { success: true, url: result.url };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    loadMore,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    toggleBookmark,
    uploadImage,
    clearError: () => setError(null)
  };
};

export const usePost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await PostService.getPostBySlug(slug);

      if (result.error) {
        setError(result.error);
      } else {
        setPost(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    loading,
    error,
    refetch: fetchPost
  };
};
