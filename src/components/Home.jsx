import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/SupabaseAuthContext';
import Sidebar from './Sidebar';
import ReactMarkdown from 'react-markdown';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Calendar,
  Clock,
  Tag,
  TrendingUp,
  Flame,
  Eye,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('relevant');
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('inkwell_posts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      // Only show published posts
      const publishedPosts = allPosts.filter(post => post.status === 'published');
      setPosts(publishedPosts);
    }
  }, []);

  const popularTags = [
    'all', 'javascript', 'react', 'webdev', 'programming', 'tutorial', 
    'beginners', 'css', 'nodejs', 'python', 'discuss', 'career'
  ];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === 'all' || 
                        post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()) ||
                        post.category?.toLowerCase() === selectedTag.toLowerCase();
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (selectedFilter) {
        case 'latest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'top':
          return (b.likes + b.views) - (a.likes + a.views);
        case 'relevant':
        default:
          // Simple relevance score based on recent engagement
          const scoreA = a.likes + (a.views * 0.1) + (new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 10 : 0);
          const scoreB = b.likes + (b.views * 0.1) + (new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 10 : 0);
          return scoreB - scoreA;
      }
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateContent = (content, maxLength = 150) => {
    const stripped = content.replace(/[#*`]/g, ''); // Remove markdown symbols
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength) + '...';
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-6">
              {/* Filter Tabs */}
              <div className="flex space-x-1">
                {['relevant', 'latest', 'top'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedFilter === filter
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter === 'relevant' && <TrendingUp className="inline h-4 w-4 mr-1" />}
                    {filter === 'latest' && <Clock className="inline h-4 w-4 mr-1" />}
                    {filter === 'top' && <Flame className="inline h-4 w-4 mr-1" />}
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Write Button */}
            <Link
              to="/create"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Tag Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTag === tag
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tag === 'all' ? '🏠 All' : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600 mb-6">
                  {posts.length === 0 
                    ? "Be the first to share your knowledge with the community!" 
                    : "Try adjusting your search or tag filters."
                  }
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Write Your First Post
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-medium">
                            {post.authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{post.authorName}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        <Link to={`/post/${post.id}`}>
                          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">
                            {post.title}
                          </h2>
                        </Link>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 4).map((tag, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedTag(tag)}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        )}

                        <p className="text-gray-700 text-sm leading-relaxed">
                          {post.excerpt || truncateContent(post.content)}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                            <span>reactions</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                            <span>comments</span>
                          </button>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500">
                            {getReadingTime(post.content)} min read
                          </span>
                          
                          <div className="flex items-center space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-32">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
