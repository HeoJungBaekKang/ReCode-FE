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
      <TERipple>
        <button
          type="button"
          onClick={toggleShow}
          className="inline-block border-4 border-slate-300  border-indigo-500/100 ring-4 rrounded-xl hover:border-t-4  text-blue-600  px-6 pb-[6px] pt-2 font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-blue-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 "
        >
          STACK 선택
        </button>
      </TERipple>
      {show && (
        <div className="absolute z-30 w-100 rounded-2xl ring-2 bg-white p-7 dark:bg-gray-700 dark:text-gray-50 ease-in-out mt-11">
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
