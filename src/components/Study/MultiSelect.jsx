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

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import axios from "axios";

function MultiSelect() {
  const { authData } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/get-skills`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.token}`
          }
        });

        console.log(response.data);

        const code = response.data.code;
        if (code === 1) {
          console.log("스택 목록 불러오기 성공");
          setSkills(response.data.data.skills || []);
        } else {
          console.log("스택 목록 불러오기 실패");
        }
      } catch (error) {
        console.error("스택 목록 불러오기 중 오류 : ", error);
        console.log(error.response);
      }
    };

    handleGet();
  }, [authData.token]);

  const options = skills.map(skill => ({ value: skill, label: skill }));

  return (
    <div>
      <Select options={options} isMulti />
    </div>
  );
}

export default MultiSelect;