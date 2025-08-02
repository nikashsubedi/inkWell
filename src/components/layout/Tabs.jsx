// components/Layout/Tabs.jsx
import React from 'react';

const tabs = ['For you', 'Featured', 'Programming', 'Productivity'];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b px-4 md:px-0">
      <div className="flex space-x-6 overflow-x-auto whitespace-nowrap text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 border-b-2 transition-colors duration-300 ${
              activeTab === tab
                ? 'border-black text-black'
                : 'border-transparent hover:text-emerald-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
