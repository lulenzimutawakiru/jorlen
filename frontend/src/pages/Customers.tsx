import React, { useState } from 'react';
import { Card, Button, Input, Select, Table } from '../components/common';

const Customers: React.FC = () => {
  const [customers] = useState([
    { id: 1, name: 'ABC Company Ltd', email: 'contact@abc.com', phone: '+256700000001', category: 'Enterprise', status: 'Active' },
    { id: 2, name: 'XYZ Solutions', email: 'info@xyz.com', phone: '+256700000002', category: 'SME', status: 'Active' },
    { id: 3, name: 'Government Office', email: 'admin@gov.ug', phone: '+256700000003', category: 'Government', status: 'Active' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'name', label: 'Company Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <Button label="+ Add Customer" variant="primary" />
      </div>

      <Card title="Search & Filter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Search" placeholder="Company name or email" value={searchTerm} onChange={setSearchTerm} />
          <Select
            label="Category"
            options={[
              { value: '', label: 'All' },
              { value: 'SME', label: 'SME' },
              { value: 'Enterprise', label: 'Enterprise' },
              { value: 'Government', label: 'Government' }
            ]}
            value=""
            onChange={() => {}}
          />
          <div className="flex items-end">
            <Button label="Search" variant="secondary" className="w-full" />
          </div>
        </div>
      </Card>

      <Card title="Customer List" className="mt-6">
        <Table columns={columns} data={customers} actions={(row) => (
          <div className="space-x-2">
            <button className="text-blue-600 hover:underline text-sm">View</button>
            <button className="text-orange-600 hover:underline text-sm">Edit</button>
            <button className="text-red-600 hover:underline text-sm">Delete</button>
          </div>
        )} />
      </Card>
    </div>
  );
};

export default Customers;
