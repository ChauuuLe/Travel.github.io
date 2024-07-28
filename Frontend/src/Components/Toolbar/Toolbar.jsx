import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({ items, currentItem, setCurrentItem }) => {
  return (
    <div className="Toolbar">
      {items.map(item => (
        <button
          key={item}
          className={currentItem === item ? 'active' : ''}
          onClick={() => setCurrentItem(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

Toolbar.propTypes = {
  items: PropTypes.array.isRequired,
  currentItem: PropTypes.string.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
};

export default Toolbar;
