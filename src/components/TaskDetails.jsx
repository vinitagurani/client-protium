import PropTypes from 'prop-types';
import '../App.css';

const TaskDetail = ({ task, onUpdate }) => {
  if (!task) return <p>Select a task to view details</p>;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    // Prevent unnecessary updates if the value is the same
    if (newStatus !== task.status) {
      onUpdate({ ...task, status: newStatus });
    }
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    // Prevent unnecessary updates if the value is the same
    if (newPriority !== task.priority) {
      onUpdate({ ...task, priority: newPriority });
    }
  };

  return (
    <div className="task-detail p-4 border rounded shadow">
      <h2 className="mb-3">{task.name}</h2>
      <p><strong>Description:</strong> {task.description || 'No description provided'}</p>
      <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date set'}</p>
      <p><strong>Priority:</strong> {task.priority || 'Low'}</p>
      <p><strong>Status:</strong> {task.status || 'To Do'}</p>

      <div className="mb-3">
        <label className="form-label">Status:</label>
        <select 
          className="form-select" 
          value={task.status || 'To Do'} // Fallback to 'To Do'
          onChange={handleStatusChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Priority:</label>
        <select 
          className="form-select" 
          value={task.priority || 'Low'} // Fallback to 'Low'
          onChange={handlePriorityChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="comments mt-4">
        <h3>Comments</h3>
        {/* {task.comments && task.comments.length > 0 ? (
          task.comments.map((comment) => (
            <div key={comment._id} className="border p-2 rounded mb-1">
              <p>{comment.text}</p>
              <small className="text-muted">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )} */}
      </div>
    </div>
  );
};

// Define prop types
TaskDetail.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure _id is included
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired, // Ensure _id is included for comments
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskDetail;
