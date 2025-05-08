import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/Axios"; // use the new instance
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", country: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/user/signup", formData);
      const { CreatingUser, token } = res.data;
      login(CreatingUser, token); // update context
      navigate("/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none"
              value={formData.name}
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
              value={formData.email}
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
              value={formData.password}
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
              value={formData.country}
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
          Already have an account?{" "}
          <Link to="/login" className="text-black underline hover:font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
