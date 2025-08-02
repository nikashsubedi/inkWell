// src/components/layout/Navbar.jsx
import React from 'react';
import { Menu, Search, Bell, PencilLine } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">InkWell</h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-6 items-center bg-gray-100 rounded-full px-3 py-1">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent focus:outline-none px-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-5">
        <PencilLine className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer" />
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="User"
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Navbar;
