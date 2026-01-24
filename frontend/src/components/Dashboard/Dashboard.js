import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../index.js";
import TaskModal from "../TaskForm/TaskForm";
import "./Dashboard.css";

const Dashboard = ({ modalOpen, handleCloseModal }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.backendPoint}/api/tasks/all`, {
        withCredentials: true,
      });
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    try {
      const { data } = await axios.patch(`${config.backendPoint}/api/tasks/update`, {
        id: task._id,
        status: newStatus
      }, {
        withCredentials: true,
      });

      if (data.success) {
        setTasks(tasks.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      alert("Error updating task status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${config.backendPoint}/api/tasks/delete`, {
        data: { id },
        withCredentials: true,
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      alert("Error deleting task");
    }
  };

  if (loading) return <div className="dashboard-status">Loading tasks...</div>;
  if (error) return <div className="dashboard-status error">{error}</div>;

  return (
    <div className="dashboard-container">
      <TaskModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        onTaskAdded={handleTaskAdded} 
      />

      <div className="dashboard-header">
        <h1>Your Tasks</h1>
        <span className="task-count">{tasks.length} Total</span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Get started by creating your first task.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className={`task-card ${task.status === 'DONE' ? 'completed' : ''}`}>
              <div className="task-body">
                <h3 style={{ textDecoration: task.status === 'DONE' ? 'line-through' : 'none' }}>
                  {task.title}
                </h3>
                <p>{task.description}</p>
                <div className={`status-badge ${task.status}`}>
                  {task.status}
                </div>
                <p className="task-deadline">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>

              <div className="task-actions">
                <button 
                  className={`btn-status ${task.status === 'DONE' ? 'undo' : 'done'}`}
                  onClick={() => handleToggleStatus(task)}
                >
                  {task.status === 'DONE' ? 'Mark as Todo' : 'Mark as Done'}
                </button>
                <button className="btn-edit">Edit</button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;