// components/feed/Feed.jsx
import React from 'react';
import PostCard from './PostCard';

const posts = [
  {
    id: 1,
    title: 'Getting Started with React and TailwindCSS',
    summary: 'Learn how to build a fast UI with React and Tailwind from scratch.',
    author: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=3',
    date: 'Aug 2, 2025',
  },
  {
    id: 2,
    title: '10 Tips to Improve Your JavaScript',
    summary: 'Practical tips to write clean and modern JavaScript code.',
    author: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    date: 'Jul 31, 2025',
  },
  {
    id: 3,
    title: 'Understanding useEffect in React',
    summary: 'A deep dive into one of the most misunderstood React hooks.',
    author: 'Alice Kim',
    avatar: 'https://i.pravatar.cc/150?img=7',
    date: 'Jul 28, 2025',
  },
];

const Feed = () => {
  return (
    <div className="flex flex-col gap-6 p-4 w-full max-w-3xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
