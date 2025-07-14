import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const res = await apiFetcher('/user/profile');
      setProfile(res);
    };
    loadProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>👤 Profile</h2>
      <p><strong>Staff ID:</strong> {profile.staffId}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
