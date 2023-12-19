import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { useParams } from "react-router-dom";

export default function StudyRoom_Recommend() {
  const [mentors, setMentors] = useState([]);
  const { authData } = useContext(AuthContext);
  const { study_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/study/${study_id}/get-recommend`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        setMentors(response.data.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-1/4">
          <StudyRoom_Sidebar />
        </div>
        <div className="w-3/4 mt-10">
          <div className="flex items-center mr-5 whitespace-nowrap w-auto">
            <span className="flex items-center mr-2 whitespace-nowrap w-auto text-green-500 font-bold text-xl">
              {authData.nickname}
            </span>
            <span className="text-black-500 font-bold text-xl">
              의 스터디룸을 위한 멘토 추천입니다!
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                name={mentor.name}
                mentorSkills={mentor.mentorSkills}
                careerYear={mentor.careerYear}
                rating={mentor.rating}
                email={mentor.email}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const Card = ({ name, mentorSkills, careerYear, rating, email }) => {
  const skills = Object.values(mentorSkills).map(
    (skill) => skill.skill.skillName
  ); // mentorSkills 객체의 skill 프로퍼티만 추출하여 배열 생성

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">이름 : {name}</h2>
      <p className="text-gray-600">
        Mentor Skills : {skills.join(", ")}{" "}
        {/* 스킬들을 쉼표로 구분하여 출력 */}
      </p>
      <p className="text-gray-600">경력 : {careerYear}년</p>
      <p className="text-gray-600">평점 : {rating}점</p>
      <p className="text-gray-600">연락처 : {email}</p>
    </div>
  );
};
