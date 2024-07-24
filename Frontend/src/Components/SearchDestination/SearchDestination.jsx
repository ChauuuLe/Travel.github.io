import React from 'react';
import PropTypes from 'prop-types';
import './SearchDestination.css';

const SearchDestination = ({ searchTerm, handleSearchChange, placeholder }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

SearchDestination.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchDestination;
