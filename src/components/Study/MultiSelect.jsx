// import React, { useState } from "react";
// import Select from "react-select";

// function MultiSelect({ onChange }) {

//   const handleChange = (selectedOptions) => {
//     // selectedOptions는 선택된 옵션 객체들의 배열
//     onChange(selectedOptions.map(option => option.value));
//   };


//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const options = [
//     { value: 'html', label: 'HTML' },
//     { value: 'css', label: 'CSS' },
//     { value: 'javascript', label: 'JavaScript' },
//     { value: 'spring', label: 'spring' },
//     { value: 'JPA', label: 'JPA' },
//     { value: 'react', label: 'react' },
//     // 여기에 추가 옵션
//   ];


//   return (
//     <Select
//       isMulti
//       name="skills"
//       options={options}
//       value={selectedOptions}
//       onChange={handleChange}
//       className="basic-multi-select"
//       classNamePrefix="select"
//     />
//   );

// }

// export default MultiSelect;

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