import { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task); // Send the task to the parent component
    // Reset the form fields after submission
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
};

export default TaskForm;
