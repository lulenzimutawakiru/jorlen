import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/leads" element={<div className="p-8"><h1>Sales Leads</h1></div>} />
            <Route path="/tickets" element={<div className="p-8"><h1>Support Tickets</h1></div>} />
            <Route path="/projects" element={<div className="p-8"><h1>Projects</h1></div>} />
            <Route path="/invoices" element={<div className="p-8"><h1>Invoices</h1></div>} />
            <Route path="/inventory" element={<div className="p-8"><h1>Inventory</h1></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
