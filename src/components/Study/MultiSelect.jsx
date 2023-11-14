import React from "react";
import Select from "react-select";

function MultiSelect() {
  
  const options = [
    { value: "java", label: "자바" },
    { value: "spring", label: "스프링" },
    { value: "c언어", label: "c언어" },
    { value: "react", label: "react" },
    { value: "javascript", label: "javascript" },
  ];

  return (
    <div>

      <Select options={options} isMulti />
    </div>
  );
}

export default MultiSelect;
