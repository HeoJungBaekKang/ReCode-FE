import React, { useState } from 'react';

// This component represents a single tech stack button and its content
const TechStackButton = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {name}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 border rounded shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

// This is the main component that uses the TechStackButton
const TechStacks = () => {
  return (
    <div className="container mx-auto p-4">
      <TechStackButton name="Java">
        <p>This is Java related content.</p>
      </TechStackButton>
      <TechStackButton name="Spring">
        <p>This is Spring related content.</p>
      </TechStackButton>
      <TechStackButton name="Node.js">
        <p>This is Node.js related content.</p>
      </TechStackButton>
    </div>
  );
};

export default TechStacks;
