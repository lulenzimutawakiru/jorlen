import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

export const Button: React.FC<{
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}> = ({ label, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = 'px-4 py-2 rounded font-medium transition';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export const Badge: React.FC<{
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}> = ({ label, variant = 'info' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {label}
    </span>
  );
};

export const Input: React.FC<{
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}> = ({ label, placeholder, value, onChange, type = 'text', required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export const Select: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}> = ({ label, options, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Choose one...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const Table: React.FC<{
  columns: { key: string; label: string }[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
}> = ({ columns, data, actions }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(col => (
            <th key={col.key} className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              {col.label}
            </th>
          ))}
          {actions && <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-4 text-center text-gray-500">
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 border-b">
              {columns.map(col => (
                <td key={`${idx}-${col.key}`} className="px-4 py-2 text-gray-800">
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
