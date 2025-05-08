import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi"


const Nav = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-6  text-black">
      <Link to="/home">
      <span className="text-2xl font-bold">
        {user?.name || "user"}'s Tracker
      </span>
      </Link>
      <nav className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="text-3xl text-black hover:text-gray-700"
          title="Dashboard"
        >
           <HiOutlineViewGrid />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-gray-700 hover:text-red-600"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>
    </header>
  );
};

export default Nav;
