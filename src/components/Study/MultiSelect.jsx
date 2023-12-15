import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import { getSkillNameByPosition } from "../../services/FilterService";

function MultiSelect({onChange, selectedPosition}) {
  const { authData } = useContext(AuthContext);
  const [skillNames, setSkillNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allSkillNames = [];
  
        if (selectedPosition === "FullStack") {
          const frontSkillNames = await getSkillNameByPosition("Frontend");
          const backSkillNames = await getSkillNameByPosition("Backend");
          allSkillNames = [...frontSkillNames, ...backSkillNames];
          setSkillNames(allSkillNames);

        } else {
          // 그 외 포지션에 대한 스킬 목록 불러오기
          allSkillNames = await getSkillNameByPosition(selectedPosition);
        }
  
        setSkillNames(allSkillNames);
      } catch (error) {
        console.error("스킬 목록 불러오기 중 오류:", error);
      }
    };
  
    if (selectedPosition) {
      fetchData();
    }
  }, [selectedPosition]);
  

  
  const options = skillNames.map(skillName => ({ value: skillName, label: skillName}));


  const handleChange = (selectedOptions) => {

    // 선택한 옵션들의 값을 이름 목록으로 추출
    const selectedSkillNames = selectedOptions.map(option => option.value);


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