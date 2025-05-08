import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/Axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/user-project/projects");
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    if (!loading && user) {
      fetchProjects();
    }
  }, [loading, user]);

  const handleCreateProject = async () => {
    if (projects.length >= 4) {
      setErrorMessage("You can only create up to 4 projects."); // NEW: Set error
      return;
    }
  
    try {
      const response = await axios.post("/user-project/create-project", {
        name: newProjectTitle,
      });
      setProjects([...projects, response.data.project]);
      setShowModal(false);
      setNewProjectTitle("");
      setErrorMessage(""); // NEW: Clear error on success
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Nav />

      <main className="flex-1 px-6 mt-16">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">Your Projects</h2>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border hover:border-black transition"
            onClick={() => setShowModal(true)}
          >
            + New Project
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {projects.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-20">
              No projects yet. Click "New Project" to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {projects.map((project) => (
                <ProjectCard
                key={project._id}
                title={project.name}
                projectId={project._id}
                onClick={() =>handleProjectClick(project._id)}
                onDelete={(id) => setProjects(prev => prev.filter(p => p._id !== id))}
              />
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">Create New Project</h3>
      <input
        type="text"
        placeholder="Project Title"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
        className="w-full border border-black rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
      {errorMessage && (
        <div className="text-red-600 text-sm mb-2">{errorMessage}</div> // NEW: Error display
      )}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowModal(false);
            setErrorMessage(""); // NEW: Clear error when closing modal
          }}
          className="px-4 py-2 border border-black rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateProject}
          className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black hover:border-black border transition"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}


      <Footer />
    </div>
  );
};

export default Dashboard;
