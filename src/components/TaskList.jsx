import PropTypes from 'prop-types';
import '../App.css';

const TaskList = ({ tasks, onTaskSelect }) => {
  return (
    <div className="task-list p-4 border rounded shadow">
      <h2 className="mb-4">Task List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id} onClick={() => onTaskSelect(task._id)} style={{ cursor: 'pointer' }}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTaskSelect: PropTypes.func.isRequired,
};

export default TaskList;
