import React, { useState } from "react";
import Select from "react-select";

function MultiSelect({ value, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "java", label: "자바" },
    { value: "spring", label: "스프링" },
    { value: "c언어", label: "c언어" },
    { value: "react", label: "react" },
    { value: "javascript", label: "javascript" },
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
   
    if (onChange) {
      onChange(selected.map(option => option.value));
    }
  };

  return (
    <div>
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleChange}
      />
    </div>
  );
}

export default MultiSelect;
