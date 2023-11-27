// TechStackButton.jsx
import React from 'react';

const TechStackButton = ({ tech, onSelect, selected }) => {
    return (
        <button
        onClick={() => onSelect(tech)}
        className={`text-xs px-2 py-1 rounded-full ${selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} m-1 whitespace-nowrap`}
    >
        {tech}
    </button>
    );
};


export default TechStackButton;
