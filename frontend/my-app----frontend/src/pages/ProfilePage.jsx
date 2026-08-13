import React, { useState } from 'react';
import { updateUserProfile } from '../services/auth_service';

const ProfilePage = ({ user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create the object with data from your form state variables
    const payload = {
      username: username,
      email: email,
    };

    // Only include password if the user typed a new one
    if (password.trim() !== '') {
      payload.password = password;
    }

    try {
      // 2. Pass 'payload' into 'updateUserProfile'
      // Inside the service function, 'profileData' will hold this 'payload' object
      const updatedUser = await updateUserProfile(payload);
      
      console.log("Updated user:", updatedUser);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data?.detail || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="New password (optional)" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfilePage;
