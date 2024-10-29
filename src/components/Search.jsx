import { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

// Define prop types
Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
