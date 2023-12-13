import React, { useState, useEffect } from "react";
import { TERipple } from "tw-elements-react";
import TabsWithButtons from "./TabsWithButtons";

// 시작 
export default function SkillFilter({
  selectedSkills,
  setSelectedSkills,
  studies,
  setFilteredStudies,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  useEffect(() => {
    // 선택된 스킬에 따라 스터디 목록을 필터링
    const filteredStudies = studies.filter((study) =>
      selectedSkills.some((skill) => study.skillNames.includes(skill))
    );
    // 필터링된 스터디 목록을 상태로 설정
    setFilteredStudies(filteredStudies);

  }, [selectedSkills, studies, setFilteredStudies]);




  // 선택된 스킬을 토글하는 함수
  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((selected) => selected !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <>
      <TERipple rippleColor="light">
        <a
          className="inline-block rounded bg-primary mr-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          role="button"
          onClick={toggleShow}
        >
          STACK 선택하기
        </a>
      </TERipple>

      {show && (
        <div className="rounded-lg bg-amber-50 p-7 dark:bg-neutral-700 dark:text-neutral-50 ease-in-out">
          <TabsWithButtons
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            handleSkillToggle={handleSkillToggle} // skill 토글 함수 전달
          />
        </div>
      )}
    </>
  );
}
