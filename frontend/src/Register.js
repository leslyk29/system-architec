
import React, { useState } from 'react';
import { register } from './api';

export default function Register() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', date_of_birth: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered successfully');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map(key => (
        <input key={key} type={key === 'password' ? 'password' : 'text'} placeholder={key.replace('_', ' ')} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
      ))}
      <button type="submit">Register</button>
    </form>
  );
}
