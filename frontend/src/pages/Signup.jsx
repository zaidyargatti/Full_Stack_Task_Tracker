import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from '../utils/Axios';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: ''
  });
  const [error, setError] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/signup', form);
      const { user: registeredUser, token } = res.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(registeredUser);

      navigate('/home', { replace: true });
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              name="country"
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border hover:border-black transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-black underline hover:font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
