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
  const { user, loading } = useAuth(); // ✅ include loading state

  // Fetch projects on mount
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

  // Create new project
  const handleCreateProject = async () => {
    try {
      const response = await axios.post("/user-project/create-project", {
        name: newProjectTitle,
      });
      setProjects([...projects, response.data.project]);
      setShowModal(false);
      setNewProjectTitle("");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // Navigate to project page
  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Nav />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 mt-16">
          <h2 className="text-xl font-semibold ml-48">Your Projects</h2>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border hover:border-black transition"
            onClick={() => setShowModal(true)}
          >
            + New Project
          </button>
        </div>

        <div className="max-w-4xl px-4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                onClick={() => handleProjectClick(project._id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal for new project */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="w-full border p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-black rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black hover:border-black border"
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
