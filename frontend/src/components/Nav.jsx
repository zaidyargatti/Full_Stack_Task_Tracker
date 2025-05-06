import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); 
    navigate('/login')
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white text-black">
      <span className="text-2xl font-bold">
        {user?.name || "user"}
      </span>
      <nav className="flex items-center space-x-4"> 
        <Link to="/dashboard" className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white">
          Dashboard
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
