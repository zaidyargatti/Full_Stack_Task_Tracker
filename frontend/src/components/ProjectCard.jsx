import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import axios from "../utils/Axios";

const ProjectCard = ({ title, projectId, onClick, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/user-project/delete-project/${projectId}`);
      onDelete(projectId); // Call a parent function to update UI
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div
      className="relative h-28 w-44 rounded-xl p-6 text-center flex items-center justify-center 
                 shadow-md bg-black text-white transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
    > 
      <h3 className="text-lg font-semibold cursor-pointer" onClick={onClick}>{title || "issue"}</h3>

      <div className="absolute top-2 right-2">
        <FiMoreVertical
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        />
        {menuOpen && (
          <div className="absolute right-0 mt-1 bg-white text-black rounded shadow z-10 w-24">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 hover:bg-red-100 text-left"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
