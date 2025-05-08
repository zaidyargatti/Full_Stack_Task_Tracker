import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Nav />

      {/* Hero Content with motion */}
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-1 flex-col items-center justify-center text-center px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back 👋</h2>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          Manage your tasks, track progress, and stay productive.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-black text-white rounded text-lg hover:bg-white hover:text-black hover:border-black border transition"
        >
          Go to Dashboard
        </Link>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Home;
