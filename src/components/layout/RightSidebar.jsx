// components/Layout/RightSidebar.jsx
import React from 'react';
import { Sparkles, Star, BookOpen, Flame } from 'lucide-react';

const staffPicks = [
  { title: 'Goodnight Children', author: 'Krista Schumacher', date: 'Jul 25' },
  { title: 'Re-wilding My Digital Art Process', author: 'Tom Froese', date: 'Apr 11' },
  { title: 'The Making of Anthropic CEO Dario Amodei', author: 'Alex Kantrowitz', date: '3d ago' },
];

const recommendedTopics = ['Programming', 'Self Improvement', 'Productivity', 'Tech'];

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-72 px-4 py-6 border-l bg-white overflow-y-auto">
      {/* Staff Picks */}
      <div className="mb-8">
        <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Staff Picks
        </h3>
        <ul className="space-y-4 text-sm">
          {staffPicks.map((item, idx) => (
            <li key={idx}>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500 text-xs">{item.author}</p>
              <p className="text-gray-400 text-xs">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Topics */}
      <div>
        <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Recommended Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {recommendedTopics.map((topic) => (
            <button
              key={topic}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
