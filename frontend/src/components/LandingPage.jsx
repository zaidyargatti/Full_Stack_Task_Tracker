import { Link } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Organize Your Work. Stay Focused.</h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          TaskTracker helps you manage your projects and tasks efficiently. Plan, track, and complete your work with ease — all in one place.
        </p>
        <Link to="/signup" className="px-6 py-3 bg-black text-white rounded text-lg hover:bg-white hover:text-black hover:border-black border transition">
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center  text-sm">
        &copy; {new Date().getFullYear()} TaskTracker. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
