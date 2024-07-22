import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ regions, currentRegion, setCurrentRegion }) => {
    return (
        <div className="tabs">
            {Object.keys(regions).map(region => (
                <button
                    key={region}
                    className={currentRegion === region ? 'active' : ''}
                    onClick={() => setCurrentRegion(region)}
                >
                    {region}
                </button>
            ))}
        </div>
    );
};

Tabs.propTypes = {
    regions: PropTypes.object.isRequired,
    currentRegion: PropTypes.string.isRequired,
    setCurrentRegion: PropTypes.func.isRequired,
};

export default Tabs;
