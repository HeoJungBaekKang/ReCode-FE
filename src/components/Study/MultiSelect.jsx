import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import axios from "axios";

function MultiSelect({onChange}) {
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

  const options = skills.map(skill => ({ value: skill, label: skill}));

  console.log('options 확인 ' , options);
  
  const handleChange = (selectedOptions) => {

    console.log('selectedOptions 선택된 정보 확인 ! : ',selectedOptions);

    // 선택한 옵션들의 값을 이름 목록으로 추출
    const selectedSkillNames = selectedOptions.map(option => option.value);


    console.log('selectedSkillNames 선택된 정보 확인 ! : ',selectedSkillNames);

    // 선택한 스킬 이름 목록을 상위 컴포넌트로 전달
    onChange(selectedSkillNames);
  };

  return (
    <div>
        <Select options={options} isMulti onChange={handleChange} />
    </div>
  );
}

export default MultiSelect;
