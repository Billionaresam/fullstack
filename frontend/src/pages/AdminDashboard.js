import React, { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await apiFetcher('/admin/users');
        setUsers(res);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };
    loadUsers();
  }, []);

  const getStatusBadge = (isArchived) => {
    return React.createElement(
      'span',
      {
        className: `px-2 py-1 rounded text-xs font-semibold ${
          isArchived ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`
      },
      isArchived ? 'Archived' : 'Active'
    );
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(NavBar, null),
    React.createElement(
      'div',
      { className: 'p-6' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '👑 Admin Dashboard'),
      React.createElement(
        'p',
        { className: 'mb-6 text-gray-600' },
        'Manage staff accounts, roles, and activity.'
      ),
      React.createElement(
        'div',
        { className: 'overflow-x-auto' },
        React.createElement(
          'table',
          { className: 'min-w-full border border-gray-200 bg-white rounded shadow-sm' },
          React.createElement(
            'thead',
            { className: 'bg-gray-100' },
            React.createElement(
              'tr',
              null,
              React.createElement('th', { className: 'text-left px-4 py-2 border' }, 'Staff ID'),
              React.createElement('th', { className: 'text-left px-4 py-2 border' }, 'Role'),
              React.createElement('th', { className: 'text-left px-4 py-2 border' }, 'Status')
            )
          ),
          React.createElement(
            'tbody',
            null,
            users.map(({ staffId, role, isArchived }, idx) =>
              React.createElement(
                'tr',
                { key: idx, className: 'hover:bg-gray-50' },
                React.createElement('td', { className: 'px-4 py-2 border' }, staffId),
                React.createElement('td', { className: 'px-4 py-2 border' }, role),
                React.createElement('td', { className: 'px-4 py-2 border' }, getStatusBadge(isArchived))
              )
            )
          )
        )
      )
    )
  );
};

export default AdminDashboard;
