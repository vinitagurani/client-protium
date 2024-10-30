import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TaskForm = ({ onSubmit, selectedTaskId, tasks }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
  });

  useEffect(() => {
    if (selectedTaskId) {
      const taskToEdit = tasks.find((task) => task._id === selectedTaskId);
      if (taskToEdit) {
        // Format the due date to YYYY-MM-DD
        const formattedDueDate = new Date(taskToEdit.dueDate).toISOString().split('T')[0];
        setTask({ ...taskToEdit, dueDate: formattedDueDate });
      }
    } else {
      // Reset form when no task is selected
      setTask({ name: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
    }
  }, [selectedTaskId, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...taskData } = task; // Omit _id if it exists
    onSubmit(taskData); // Send taskData without _id
    setTask({ name: '', description: '', dueDate: '', priority: 'Low', status: 'To Do' });
  };

  return (
    <form className="task-form p-4 border rounded shadow" onSubmit={handleSubmit}>
      <h2 className="mb-3">Create Task</h2>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          placeholder="Task Name"
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
          className="form-control"
        ></textarea>
      </div>
      <div className="mb-3">
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Priority:</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Status:</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
};

// Define prop types
TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedTaskId: PropTypes.string,
  tasks: PropTypes.array.isRequired,
};

export default TaskForm;
