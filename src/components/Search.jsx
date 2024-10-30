import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce function to limit the frequency of the search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Wait for 300ms after the last change

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
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
