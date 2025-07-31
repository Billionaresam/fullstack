import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const res = await apiFetcher('/user/profile');
      setProfile(res);
    };
    loadProfile();
  }, []);

  if (!profile)
    return (
      <>
        <NavBar />
        <p className="text-center mt-10 text-gray-500">Loading profile...</p>
      </>
    );

  const getInitials = (email) => email ? email.slice(0, 2).toUpperCase() : 'NA';

  const getRoleStyle = (role) => {
    const base = 'px-2 py-1 rounded text-xs font-semibold';
    if (role === 'Admin') return `${base} bg-purple-100 text-purple-700`;
    if (role === 'Editor') return `${base} bg-blue-100 text-blue-700`;
    if (role === 'Publisher') return `${base} bg-green-100 text-green-700`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <>
      <NavBar />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold text-gray-700 ring-2 ring-gray-300">
            {getInitials(profile.email)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.email}</h2>
            <span className={getRoleStyle(profile.role)}>{profile.role}</span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p><span className="font-medium">Staff ID:</span> {profile.staffId}</p>
          <p><span className="font-medium">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
