// src/components/Card.jsx
import React from 'react';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';

const Card = ({ post }) => {
  // Destructure properties from the 'post' object
  const {
    category,
    title,
    description,
    author,
    readTime,
    likes,
    comments,
    isBookmarked,
    topSectionTitle,
  } = post;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Top section with dynamic title */}
      <div className="bg-blue-300 h-40 flex items-center justify-center p-4">
        <h2 className="text-white text-3xl font-bold text-center">{topSectionTitle}</h2>
      </div>

      {/* Content section */}
      <div className="p-6">
        <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">{category}</p>
        <h3 className="font-bold text-xl mb-3 leading-tight text-gray-900">{title}</h3>
        <p className="text-gray-700 text-base mb-4 line-clamp-3"> {/* line-clamp for description */}
          {description}
        </p>

        {/* Author and read time */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-white text-xs font-bold">{author.initials}</span>
          </div>
          <span className="truncate">By {author.name}</span> {/* Truncate author name if too long */}
          <span className="mx-2">•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Icons and counts */}
        <div className="flex items-center text-gray-600 text-sm mt-2">
          <div className="flex items-center mr-4">
            <Heart size={18} className="mr-1 text-red-500" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center mr-4">
            <MessageSquare size={18} className="mr-1 text-blue-500" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <Bookmark
              size={18}
              className={isBookmarked ? 'fill-current text-purple-600 mr-1' : 'text-gray-400 mr-1'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
