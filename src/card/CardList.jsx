// src/card/CardList.jsx
import React from 'react';
import Card from './Card'; // Import the Card component from the same directory
import { postsData } from './data'; // CORRECTED: Import the 1000 posts data from the same directory

const CardList = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">All 1000 Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-8 justify-items-center">
        {/* Map over the postsData array and render a Card component for each post */}
        {postsData.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
