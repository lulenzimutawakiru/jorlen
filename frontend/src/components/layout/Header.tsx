import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Jorlen CRM Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Notifications</button>
          <button className="text-gray-600 hover:text-gray-900">Profile</button>
          <button className="text-gray-600 hover:text-gray-900">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
