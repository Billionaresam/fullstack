import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      {/* rest of your dashboard UI */}
    </>
  );
};

  useEffect(() => {
    const loadUsers = async () => {
      const res = await apiFetcher('/admin/users'); // assumes backend has this route
      setUsers(res);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h2>👑 Admin Dashboard</h2>
      <p>Manage staff accounts, roles, and activity below.</p>

      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ staffId, role, isArchived }, idx) => (
            <tr key={idx}>
              <td>{staffId}</td>
              <td>{role}</td>
              <td>{isArchived ? 'Archived' : 'Active'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
