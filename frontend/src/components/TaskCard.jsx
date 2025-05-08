import { useState } from 'react';
import axios from '../utils/Axios';
import { FiMoreHorizontal } from 'react-icons/fi';

const TaskCard = ({
  taskId,
  title,
  dueDate,
  description,
  initialStatus,
  createdAt,
  completedAt: initialCompletedAt,
  onDelete,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [completedAt, setCompletedAt] = useState(initialCompletedAt);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await axios.put(`/user-task/task-status/${taskId}`, {
        status: newStatus,
      });
      const updatedTask = res.data.task;
      setStatus(updatedTask.status);
      setCompletedAt(updatedTask.completedAt);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/user-task/delete-task/${taskId}`);
      onDelete(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/user-task/update-task/${taskId}`, {
        title: editedTitle,
        description: editedDescription,
        dueDate: new Date(editedDueDate).toISOString(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="border border-black rounded p-4 hover:bg-gray-100 transition flex flex-col md:flex-row justify-between gap-4 relative">
      {/* Left Side */}
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border rounded p-1 w-full mb-2"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border rounded p-1 w-full mb-2"
              rows={2}
            />
            <input
              type="date"
              value={editedDueDate ? editedDueDate.slice(0, 10) : ''}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="border rounded p-1 w-full mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium">{editedTitle}</h3>
            <p className="text-sm text-gray-600">Due: {formatDate(editedDueDate)}</p>
            {editedDescription && (
              <p className="text-sm text-gray-700 mt-1">{editedDescription}</p>
            )}
            {status === 'Done' && completedAt && (
              <p className="text-sm text-black mt-1 font-medium">
                ✅ Completed: {formatDate(completedAt)}
              </p>
            )}
          </>
        )}
      </div>
  
      {/* Right Side */}
      <div className="flex flex-col items-start text-sm gap-2 min-w-[180px]">
        <div>
          <label className="block text-sm font-medium mb-1">Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-full"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="text-xs text-gray-500">
          <p>Created At: {formatDate(createdAt)}</p>
        </div>
      </div>
  
      {/* 3-dot Menu */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setShowOptions(!showOptions)} className="text-gray-600 hover:text-black">
          <FiMoreHorizontal />
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-40 z-10">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowOptions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit Task
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Delete Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default TaskCard;
