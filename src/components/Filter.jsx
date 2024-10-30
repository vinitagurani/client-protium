import PropTypes from 'prop-types';
import '../App.css';

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter mb-4 mt-4">
      <h3>Filter Tasks</h3>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label" htmlFor="status">Status:</label>
          <select 
            id="status" 
            name="status" 
            className="form-select cursor-pointer" // Bootstrap cursor-pointer
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <div className="col-md-4 mb-3">
          <label className="form-label" htmlFor="priority">Priority:</label>
          <select 
            id="priority" 
            name="priority" 
            className="form-select cursor-pointer" // Bootstrap cursor-pointer
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="col-md-4 mb-3">
          <label className="form-label" htmlFor="dueDate">Due Date:</label>
          <input 
            type="date" 
            id="dueDate" 
            name="dueDate" 
            className="form-control cursor-pointer" // Bootstrap cursor-pointer
            onChange={handleFilterChange} 
          />
        </div>
      </div>
    </div>
  );
};

// Define prop types
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
