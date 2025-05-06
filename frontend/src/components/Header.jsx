import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6  bg-white text-black">
      <Link to="/" className="text-2xl font-bold">
        TaskTracker
      </Link>
      <nav className="space-x-4">
        <Link to="/login" className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white">
          Login
        </Link>
        <Link to="/signup" className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black border">
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
