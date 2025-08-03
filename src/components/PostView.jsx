import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/SupabaseAuthContext';
import ReactMarkdown from 'react-markdown';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const PostView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Load post from localStorage
    const savedPosts = localStorage.getItem('inkwell_posts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      const foundPost = allPosts.find(p => p.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        // Increment view count
        foundPost.views = (foundPost.views || 0) + 1;
        localStorage.setItem('inkwell_posts', JSON.stringify(allPosts));
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Load comments for this post
    const savedComments = localStorage.getItem(`inkwell_comments_${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [id]);

  const handleLike = () => {
    if (!post) return;
    
    const savedPosts = JSON.parse(localStorage.getItem('inkwell_posts') || '[]');
    const postIndex = savedPosts.findIndex(p => p.id === id);
    
    if (postIndex !== -1) {
      if (liked) {
        savedPosts[postIndex].likes = Math.max(0, savedPosts[postIndex].likes - 1);
      } else {
        savedPosts[postIndex].likes = (savedPosts[postIndex].likes || 0) + 1;
      }
      
      localStorage.setItem('inkwell_posts', JSON.stringify(savedPosts));
      setPost(savedPosts[postIndex]);
      setLiked(!liked);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Save bookmark state to localStorage
    const bookmarks = JSON.parse(localStorage.getItem(`inkwell_bookmarks_${user.id}`) || '[]');
    if (bookmarked) {
      const filtered = bookmarks.filter(b => b !== id);
      localStorage.setItem(`inkwell_bookmarks_${user.id}`, JSON.stringify(filtered));
    } else {
      bookmarks.push(id);
      localStorage.setItem(`inkwell_bookmarks_${user.id}`, JSON.stringify(bookmarks));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      content: newComment,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`inkwell_comments_${id}`, JSON.stringify(updatedComments));
    
    // Update comment count in post
    const savedPosts = JSON.parse(localStorage.getItem('inkwell_posts') || '[]');
    const postIndex = savedPosts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      savedPosts[postIndex].comments = updatedComments.length;
      localStorage.setItem('inkwell_posts', JSON.stringify(savedPosts));
      setPost(savedPosts[postIndex]);
    }
    
    setNewComment('');
  };

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const savedPosts = JSON.parse(localStorage.getItem('inkwell_posts') || '[]');
      const filtered = savedPosts.filter(p => p.id !== id);
      localStorage.setItem('inkwell_posts', JSON.stringify(filtered));
      navigate('/dashboard');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/posts"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-medium">
                    {post.authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.authorName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{getReadingTime(post.content)} min read</span>
                    <span className="mx-2">•</span>
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{post.views || 0} views</span>
                  </div>
                </div>
              </div>

              {/* Actions for post owner */}
              {user.id === post.authorId && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleDeletePost}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Engagement Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    liked 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{post.likes || 0}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    bookmarked 
                      ? 'bg-yellow-50 text-yellow-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>

                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Discussion ({comments.length})
            </h3>
          </div>

          {/* Add Comment */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add to the discussion..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-gray-200">
            {comments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {comment.authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium text-gray-900">{comment.authorName}</p>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-sm text-gray-500 hover:text-indigo-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
