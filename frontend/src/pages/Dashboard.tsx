import React, { useState } from 'react';
import { Card, Button } from '../common';

const Dashboard: React.FC = () => {
  const [stats] = useState({
    totalCustomers: 42,
    activeLeads: 15,
    openTickets: 8,
    pendingInvoices: 5,
    totalRevenue: '₦2,450,000',
    projects: 3
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Total Customers">
          <p className="text-4xl font-bold text-blue-600">{stats.totalCustomers}</p>
          <p className="text-gray-500 text-sm">Registered accounts</p>
        </Card>

        <Card title="Active Leads">
          <p className="text-4xl font-bold text-green-600">{stats.activeLeads}</p>
          <p className="text-gray-500 text-sm">Sales opportunities</p>
        </Card>

        <Card title="Open Support Tickets">
          <p className="text-4xl font-bold text-orange-600">{stats.openTickets}</p>
          <p className="text-gray-500 text-sm">Awaiting resolution</p>
        </Card>

        <Card title="Pending Invoices">
          <p className="text-4xl font-bold text-red-600">{stats.pendingInvoices}</p>
          <p className="text-gray-500 text-sm">Awaiting payment</p>
        </Card>

        <Card title="Total Revenue (YTD)">
          <p className="text-3xl font-bold text-purple-600">{stats.totalRevenue}</p>
          <p className="text-gray-500 text-sm">Uganda Shilling</p>
        </Card>

        <Card title="Active Projects">
          <p className="text-4xl font-bold text-indigo-600">{stats.projects}</p>
          <p className="text-gray-500 text-sm">In progress</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activities">
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span>New customer: ABC Ltd</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Invoice #INV-202402-00145 issued</span>
              <span className="text-gray-500">5 hours ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Ticket #TKT-020802-189 resolved</span>
              <span className="text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Project "Network Upgrade" started</span>
              <span className="text-gray-500">2 days ago</span>
            </li>
          </ul>
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-3">
            <Button label="Create New Customer" variant="primary" className="w-full" />
            <Button label="Add Sales Lead" variant="primary" className="w-full" />
            <Button label="Create Support Ticket" variant="secondary" className="w-full" />
            <Button label="View Reports" variant="secondary" className="w-full" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
