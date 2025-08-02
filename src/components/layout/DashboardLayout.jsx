// src/components/layout/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import Tabs from './Tabs';
import Feed from '../feed/Feed';
import Navbar from './Navbar'; // ✅ Import Navbar

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ✅ Top Navbar */}
      <Navbar />

      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Tabs />
          <div className="mt-6">
            <Feed />
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
