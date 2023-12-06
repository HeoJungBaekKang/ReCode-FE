import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${
              isOpen
                ? 'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : ''
            }`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            기술 스택
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div className="flex space-x-4" role="none">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" defaultChecked />
              <span className="ml-2">Java</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">JavaScript</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">React</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Kotlin</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">MySQL</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Phython</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Go</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
