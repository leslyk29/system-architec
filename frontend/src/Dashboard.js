
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {user.first_name} {user.last_name}</h2>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.date_of_birth}</p>
      <p>Address: {user.address}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
