import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/leads', label: 'Sales Leads', icon: '🎯' },
    { path: '/tickets', label: 'Support Tickets', icon: '🎫' },
    { path: '/projects', label: 'Projects', icon: '🏗️' },
    { path: '/invoices', label: 'Invoices', icon: '💰' },
    { path: '/inventory', label: 'Inventory', icon: '📦' }
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Jorlen CRM</h1>
        <p className="text-gray-400 text-xs">ICT Services</p>
      </div>

      <nav className="space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition">
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
