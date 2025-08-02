import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import AuthorBadge from './AuthorBadge'; // ✅ Corrected path

const PostCard = ({ title, summary, author, avatar, date }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <AuthorBadge name={author} avatar={avatar} timestamp={date} />
        <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Content */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{summary}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 text-sm pt-2 border-t mt-4">
        <button className="flex items-center space-x-1 hover:text-red-500 transition">
          <Heart className="w-4 h-4" />
          <span>12</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500 transition">
          <MessageCircle className="w-4 h-4" />
          <span>3</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-green-500 transition">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
