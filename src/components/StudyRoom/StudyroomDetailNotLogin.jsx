import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import Footer from "../Fix/Footer";

const StudyRoomNotLogin = () => {
  const navigate = useNavigate();
  const { study_id } = useParams();
  const { authData } = useContext(AuthContext);
  const [detail, setDetail] = useState({
    study_id: "",
    studyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    currentNum: "",
    maxNum: "",
    master: "",
    skillNames: [],
    attendanceDay: [],
    createdAt: "",
    updatedAt: "",
    userId: "",
  });

  const [badge, setBadge] = useState({
    userId: detail.userId,
    name: "",
  });
  const handleGet = async () => {
    try {
      await axios
        .get(`/api/study/${study_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setDetail(response.data.data || {});
          const code = response.data.code;
          if (code === 1) {
            checkStudyRoomMembership();
            checkStudyRoomMembership();
          } else {
          }
        });
    } catch (error) {
    }
  };
  const [isInStudyRoom, setIsInStudyRoom] = useState(false);
  const handlePost = async () => {
    try {
      await axios
        .post(
          `/api/v1/study/${study_id}/apply`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        )
        .then((response) => {
          const code = response.data.code;
          if (code === 1) {
          } else {
          }
        });
    } catch (error) {
    }
  };
  // 스터디룸 가입 여부를 확인하는 함수
  const checkStudyRoomMembership = async () => {
    if (!authData) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }
    try {
      const response = await axios.get(
        `/api/v1/users/${authData.id}/studyrooms/${study_id}/isInStudyRoom`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );


      setIsInStudyRoom(response.data);
    } catch (error) {
    }
  };
  // 신청 버튼 클릭 핸들러
  const handleStudyRoomClick = async () => {
    if (!authData.id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await checkStudyRoomMembership();

      if (isInStudyRoom) {
        alert("이미 가입된 스터디입니다.");
      } else {
        await handlePost();
        alert("스터디 신청 완료");
        navigate("/");
      }
    } catch (error) {
    }
  };

  const handleGetBadge = async () => {
    const userId = detail.userId;
    if (!userId) {
      return;
    }

    try {
      const response = await axios.get(`/api/get-badge/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data && response.data.code === 1) {
        setBadge(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };

  const badgeImages = {
    Seed: "/img/Seed.png",
    Sprout: "/img/Sprout.png",
    Seedling: "/img/Seedling.png",
    Bud: "/img/Bud.png",
    Bloom: "/img/Bloom.png",
  };

  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (detail.userId) {
      handleGetBadge();
    }
  }, [detail.userId]);

  return (
    <>
      <div className="max-w-screen-md max-h-screen mx-auto p-4">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900">
              {detail.title}
            </h2>
            <div
              className={`text-sm px-3 py-1 w-30 rounded-full ${detail.maxNum - detail.currentNum <= 2 &&
                  detail.maxNum !== detail.currentNum
                  ? "bg-red-400 text-white"
                  : detail.maxNum > detail.currentNum
                    ? "inline-block bg-green-400 text-white"
                    : "bg-gray-400 text-white"
                }`}
            >
              {detail.maxNum - detail.currentNum <= 2 &&
                detail.maxNum !== detail.currentNum
                ? "마감 임박"
                : detail.maxNum > detail.currentNum
                  ? "모집중"
                  : "모집 완료"}
            </div>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {" "}
            {detail.createdAt}{" "}
          </p>
          <div className="flex items-center text-sm font-medium -leading-6 text-gray-600">
            <div className="flex items-center">
              <span>작성자 | {detail.master}</span>
              {badge.name && (
                <img
                  src={badgeImages[badge.name]}
                  alt={badge.name}
                  className="ml-2"
                  style={{ width: "30px", height: "30px" }} // 이미지 크기 조절
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                스터디 이름
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detail.studyName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                모집 인원
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detail.maxNum} 명{" "}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                진행 기간
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detail.startDate} ~ {detail.endDate}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                출석 시간
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detail.startTime} ~ {detail.endTime}{" "}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                출석 요일
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {Array.isArray(detail.attendanceDay) &&
                  detail.attendanceDay.map(
                    (
                      attendanceDay,
                      index // 배열인지 확인
                    ) => (
                      <span
                        key={index}
                        className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                      >
                        {attendanceDay}
                      </span>
                    )
                  )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                기술 스택
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="flex flex-wrap">
                  {Array.isArray(detail.skillNames) &&
                    detail.skillNames.map(
                      (
                        skill,
                        index // 배열인지 확인
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 mt-1 ml-1 mb-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )}
                </div>
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-1sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 ">
                소개
              </dt>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ReactHtmlParser(detail.description)}
              </div>
            </div>
            <button
              type="submit"
              onClick={handleStudyRoomClick}
              className="transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
            >
              스터디 가입 신청하기
            </button>
          </dl>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudyRoomNotLogin;
