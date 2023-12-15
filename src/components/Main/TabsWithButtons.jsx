import React, { useState, useEffect } from "react";
import { getSkillNameByPosition } from "../../services/FilterService";

export default function TabsWithButtons({ selectedSkills, setSelectedSkills }) {
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  // tab -> 전체보기, 백엔드, 프론트 엔드 전달받는 함수
  const [activeTab, setActiveTab] = useState("FullStack");

  useEffect(() => {
    async function loadInitialSkills() {
      const frontSkillByPosition = await getSkillNameByPosition("frontend");
      const backSkillByPosition = await getSkillNameByPosition("backend");
      const initialSkills = [...frontSkillByPosition, ...backSkillByPosition];
      setSkills(initialSkills);
    }

    loadInitialSkills();
  }, []);

  // 탭 전환
  const handleTabClick = async (tabName) => {
    setActiveTab(tabName);

    // 포지션에 따른 스킬 불러오기
    if (tabName === "FullStack") {
      const frontSkillByPosition = await getSkillNameByPosition("frontend");
      const backSkillByPosition = await getSkillNameByPosition("backend");
      const skillByPosition = [...frontSkillByPosition, ...backSkillByPosition];
      setSkills(skillByPosition);
    } else if (tabName === "Backend") {
      console.log(tabName);
      const skillByPosition = await getSkillNameByPosition("backend");
      console.log("backend skill 불러왔습니다. ", skillByPosition);
      setSkills(skillByPosition);
    } else if (tabName === "Frontend") {
      const skillByPosition = await getSkillNameByPosition("frontend");
      setSkills(skillByPosition);
      console.log("frontend skill 불러왔습니다. ", skillByPosition);
    } // 다른 탭에 대해서도 필요한 포지션에 따른 스킬 불러오기 함수 호출 추가

    // 이후 탭에 따라서 스킬 목록이 설정될 것입니다.
  };

  useEffect(() => {
    const loadSkillsByPosition = async (position) => {
      try {
        const skillByPosition = await getSkillNameByPosition(position);
        console.log("skillByPosition 출력 : ", skillByPosition);
        setSkills(skillByPosition);
      } catch (error) {
        console.log("position 별 스킬 목록 가져오기 중 오류 : ", error);
      }
    };
    loadSkillsByPosition(activeTab);
  }, []);

  // 스킬 선택
  const handleSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      // 이미 선택된 스킬인 경우 선택 해제
      setSelectedSkills(
        selectedSkills.filter((selected) => selected !== skill)
      );
    } else {
      // 선택되지 않은 스킬인 경우 선택
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  const handleClearSelection = () => {
    setSelectedSkills([]);
  };
  const isSkillSelected = (skill) => selectedSkills.includes(skill);

  return (
    <div className="">
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2">
            <a
              href="#"
              onClick={() => handleTabClick("FullStack")}
              class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 dark:hover:text-gray-300 ${
                activeTab === "FullStack" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              FullStack
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              onClick={() => handleTabClick("Backend")}
              class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 dark:hover:text-gray-300 ${
                activeTab === "Backend" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              Backend
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              onClick={() => handleTabClick("Frontend")}
              class={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 dark:hover:text-gray-300 ${
                activeTab === "Frontend" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              Frontend
            </a>
          </li>
        </ul>
      </div>

      {/* 데이터베이스에 저장되어있는 skill 불러와서 선택 창에 띄우는 부분  */}
      <div className="flex flex-wrap grid-cols-10">
        <div className="mt-5  mr-3 ml-3">
          {/* 스킬 목록 출력 */}
          {activeTab && (
            <div className="flex flex-wrap grid grid-cols-10 gap-3">
              {skills &&
                skills.length > 0 &&
                skills.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => handleSkillClick(skill)}
                    className={`text-ms px-2 py-1 rounded-full  ${
                      isSkillSelected(skill)
                        ? "bg-blue-50 text-blue-600 border-solid border-2 border-blue-100"
                        : "bg-white text-gray-800"
                    } rounded shadow-md focus:outline-none hover:bg-blue-50`}
                  >
                    {skill}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* 사용자가 선택한 목록 보여주는 부분  */}
      <div className="mt-4 flex flex-wrap grid-cols-12">
        <h3 className="text-ms px-2 py-1 mt-3 mb-3 mr-2">선택한 목록</h3>

        <div className="flex flex-wrap">
          {selectedSkills &&
            selectedSkills.length > 0 &&
            selectedSkills.map((selectedSkill, index) => (
              <div
                key={index}
                className="text-ms bg-blue-50 px-2 py-1 mt-3 mb-3 mr-2 rounded-full"
              >
                #{selectedSkill}
              </div>
            ))}
        </div>
        <button
          onClick={handleClearSelection}
          className="text-ms px-2 py-1 rounded-full"
        >
          선택 초기화
        </button>
      </div>
    </div>
  );
}
