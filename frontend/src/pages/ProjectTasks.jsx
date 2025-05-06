import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TaskCard from "../components/TaskCard";
import axios from "../utils/Axios";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/user-project/project/${projectId}`);
        setProjectName(res.data.project.name);
      } catch (error) {
        console.error("Error fetching project name:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/user-task/task/${projectId}`);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchProject();
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async () => {
    try {
      const res = await axios.post("/user-task/create-task", {
        ...newTask,
        dueDate: new Date(newTask.dueDate).toISOString(),
        projectId,
      });
      setTasks((prev) => [...prev, res.data.task]);
      setShowModal(false);
      setNewTask({ title: "", dueDate: "", description: "" });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Nav />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Tasks for Project <span className="font-bold">{projectName}</span>
          </h2>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border hover:border-black transition"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard
              taskId={task._id}
              key={task._id}
              title={task.title}
              dueDate={task.dueDate}
              description={task.description}
              initialStatus={task.status}
              createdAt={task.createdAt}
              completedAt={task.completedAt}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border p-2 mb-2"
            />
            <input
              type="date"
              value={newTask.dueDate ? newTask.dueDate.slice(0, 10) : ''}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full border p-2 mb-2"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
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
                onClick={handleCreateTask}
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

export default ProjectTasks;
