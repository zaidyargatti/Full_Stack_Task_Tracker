const ProjectCard = ({ title, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="h-28 w-44 cursor-pointer border border-black rounded p-6 text-center hover:bg-gray-100 transition"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    );
  };
  
  export default ProjectCard;
  