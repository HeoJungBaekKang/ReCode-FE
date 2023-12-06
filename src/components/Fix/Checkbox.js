import React, { useState } from 'react';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="border p-4">
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className="ml-2">최신순</span>
      </label>
    </div>
  );
};

export default Checkbox;
