import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await apiFetcher('/admin/users');
      setUsers(res);
    };
    loadUsers();
  }, []);

  const getStatusBadge = (isArchived) => {
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          isArchived ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}
      >
        {isArchived ? 'Archived' : 'Active'}
      </span>
    );
  };

  return (
    <>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">👑 Admin Dashboard</h2>
        <p className="mb-6 text-gray-600">Manage staff accounts, roles, and activity.</p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border">Staff ID</th>
                <th className="text-left px-4 py-2 border">Role</th>
                <th className="text-left px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ staffId, role, isArchived }, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{staffId}</td>
                  <td className="px-4 py-2 border">{role}</td>
                  <td className="px-4 py-2 border">{getStatusBadge(isArchived)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
