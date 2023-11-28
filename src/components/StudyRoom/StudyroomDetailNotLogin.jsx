import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudyRoomNotLogin = () => {
  const navigate = useNavigate();
  const { study_room_id } = useParams();
  const { authData } = useContext(AuthContext);

  const [detail, setDetail] = useState({
    study_room_id: "",
    study_name: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    current_num: "",
    max_num: "",
    master: "",
    skillNames: [],
    createdAt: "",
    updatedAt: "",
  });

  const handleGet = async () => {
    try {
      await axios
        .get(`http://localhost:8081/api/study/${study_room_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);

          setDetail(response.data.data || {});

          const code = response.data.code;

          if (code === 1) {
            console.log("스터디 상세보기 조회 성공");
          } else {
            console.log("스터디 상세보기 조회 실패");
          }
        });
    } catch (error) {
      console.error("스터디 상세보기 조회 중 오류 발생 : ", error);
    }
  };

  useEffect(() => {
    handleGet(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
  }, []);

  return (
    <>
      <div>
        <div className="max-w-screen-md mx-auto p-4">
          {/* 글 상세 내용 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">{detail.master}</span>
              <span className="mr-4">{detail.createdAt}</span>
            </div>
            <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">모집인원 {detail.max_num}</span>
              <span className="mr-4">스터디 기간 {detail.start_date}</span>
              <span>{detail.end_date}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">
                출석인정 시작 시간 {detail.start_time}
              </span>
              <span className="mr-4"> 종료 시간 {detail.end_time}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">사용언어:</span>
              {Array.isArray(detail.skillNames) &&
                detail.skillNames.map(
                  (
                    skill,
                    index // 배열인지 확인
                  ) => (
                    <span
                      key={index}
                      className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
            </div>
            <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
            <div className="text-2xl">소개</div>
            <div className="mt-10 mb-10">
              <p className="text-gray-800 dark:text-gray-200">
                {detail.description}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              신청
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyRoomNotLogin;
