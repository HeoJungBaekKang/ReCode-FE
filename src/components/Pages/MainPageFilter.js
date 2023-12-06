
import React, { useState, useEffect } from 'react';
import TechStackButton from '../TechStackButton';

const MainPageFilter = ({onFilterChange}) => {
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [showTechStacks, setShowTechStacks] = useState(false);


    const handleTechSelect = (tech) => {
        setSelectedTechs(prevSelected =>
            prevSelected.includes(tech)
                ? prevSelected.filter(t => t !== tech)
                : [...prevSelected, tech]
        );
    };

    useEffect(() => {
        onFilterChange(selectedTechs);
    }, [selectedTechs, onFilterChange]);

    return (
        <div>
            <button
                className="p-2 bg-gray-200 rounded-md text-md"
                onClick={() => setShowTechStacks(!showTechStacks)}
            >
                기술 스택
            </button>

            {showTechStacks && (
                <div className="flex justify-center flex-wrap mt-2">
                    {['React', 'Node.js', 'Python', 'Java', 'springboot', 'spring', 'figma'].map(tech => (
                        <TechStackButton
                            key={tech}
                            tech={tech}
                            selected={selectedTechs.includes(tech)}
                            onSelect={handleTechSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MainPageFilter; 