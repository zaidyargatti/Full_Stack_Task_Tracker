import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from '../utils/Axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/home" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', form);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError( 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to TaskTracker</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 mb-4 rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none "
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black hover:border hover:border-black transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-black underline hover:font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
