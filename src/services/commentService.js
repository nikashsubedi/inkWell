import { supabase } from '../lib/supabase';

export class CommentService {
  // Get comments for a post
  static async getCommentsByPost(postId) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url
          ),
          replies:comments!parent_id (
            *,
            profiles:author_id (
              id,
              username,
              full_name,
              avatar_url
            )
          )
        `)
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Create a new comment
  static async createComment(commentData) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      // Update post comment count
      await supabase.rpc('update_comment_count', { 
        post_id: commentData.post_id, 
        increment_by: 1 
      });

      return { data, error: null };
    } catch (error) {
      console.error('Error creating comment:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Update a comment
  static async updateComment(commentId, content) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', commentId)
        .select(`
          *,
          profiles:author_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error updating comment:', error.message);
      return { data: null, error: error.message };
    }
  }

  // Delete a comment
  static async deleteComment(commentId, postId) {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      // Update post comment count
      await supabase.rpc('update_comment_count', { 
        post_id: postId, 
        increment_by: -1 
      });

      return { error: null };
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      return { error: error.message };
    }
  }

  // Like/Unlike a comment
  static async toggleCommentLike(commentId, userId) {
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', userId);

        if (error) throw error;

        // Decrement like count
        await this.updateCommentLikeCount(commentId, -1);
        
        return { liked: false, error: null };
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert([{ comment_id: commentId, user_id: userId }]);

        if (error) throw error;

        // Increment like count
        await this.updateCommentLikeCount(commentId, 1);
        
        return { liked: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling comment like:', error.message);
      return { liked: false, error: error.message };
    }
  }

  // Helper method to update comment like count
  static async updateCommentLikeCount(commentId, increment) {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ 
          like_count: supabase.sql`like_count + ${increment}`
        })
        .eq('id', commentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating comment like count:', error.message);
    }
  }
}

export default CommentService;
