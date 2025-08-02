// components/Layout/Sidebar.jsx
import React from 'react';
import {
  Home,
  Book,
  User,
  FileText,
  BarChart2,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Library', icon: Book, path: '/library' },
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Stories', icon: FileText, path: '/stories' },
  { label: 'Stats', icon: BarChart2, path: '/stats' },
  { label: 'Settings', icon: Settings, path: '/settings' }
];

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen bg-white shadow-md p-6 border-r hidden md:flex flex-col">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-8">InkWell</h2> */}
      <nav className="flex flex-col gap-4">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition"
          >
            <Icon size={20} />
            <span className="text-base">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
