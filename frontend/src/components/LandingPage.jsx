import { Link } from 'react-router-dom';
import Header from './Header';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col overflow-hidden">

      {/* Header (nav bar) */}
      <Header />

      {/* Background Circles: placed below the nav bar */}
      <div className="absolute top-20 left-[-150px] w-[300px] h-[300px] bg-gray-100 rounded-full z-0 opacity-60"></div>
      <div className="absolute bottom-10 right-[-150px] w-[300px] h-[300px] bg-gray-100 rounded-full z-0 opacity-60"></div>

      {/* Hero Section */}
      <main className="relative flex flex-1 flex-col justify-center items-center px-6 text-center z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Organize Your Work. Stay Focused.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          TaskTracker helps you manage your projects and tasks efficiently. Plan,
          track, and complete your work with ease — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <Link
            to="/signup"
            className="px-6 py-3 bg-black text-white rounded text-lg hover:bg-white hover:text-black hover:border-black border transition"
          >
            Get Started
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm z-10">
        &copy; {new Date().getFullYear()} TaskTracker. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
