/* eslint-disable react/jsx-pascal-case */
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { format } from "date-fns";
import MultiSelect from "../Study/MultiSelect";
import { getSkillNameByPosition } from "../../services/FilterService";
import StudyRecruitEditor from "../Editor/StudyRecruitEditor";
import { updateStudy } from "../../services/StudyRecruitmentService";
import { data } from "autoprefixer";

const StudyModify = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [editedSkillName, setEditedSkillName] = useState([]); // 수정모드에서 새롭게 저장된 스킬 이름
  const [selectedPosition, setSelectedPosition] = useState("");
  const [position, setPosition] = useState(""); // 포지션 상태
  const [skillNames, setSkillNames] = useState([]); // skillName 목록 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드를 위한 상태
  const [selectedDays, setSelectedDays] = useState([]);
  const [description, setDescription] = useState("");
  const [attendanceDay, setAttendanceDay] = useState([]);
  const [initialSelectedDays, setInitialSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [startTime, setStartTime] = useState(""); // 출석 인정 시작 시간
  const [endTime, setEndTime] = useState(""); // 출석 인정 종료 시간
  const [maxNum, setMaxNum] = useState("");
  // const plainTextContent = removeFormatting(description);
  const { study_id } = useParams();
  const { authData } = useContext(AuthContext);
  const [studyName, setStudyName] = useState("");
  const [master, setMaster] = useState("");
  const [title, setTitle] = useState("");
  const [currentNum, setCurrentNum] = useState("");

  // 분 단위의 시간을 HH:MM 형식의 문자열로 변환하는 함수
  const convertToHHMM = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (timeInMinutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`/api/study/${study_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      console.log("날 화나게 하지마 : ", data);

      // setDetail(data || {});

      const code = response.data.code;
      console.log("code", code);
      if (code === 1) {
        console.log("스터디 상세보기 조회 성공");
        console.log("화가난다.", data.title);
        console.log(data.currentNum);
        setTitle(data.title);
        setMaxNum(data.maxNum);
        setCurrentNum(data.currentNum);
        setMaster(data.master);
        setStudyName(data.studyName);
        setSkillNames(data.skillNames);
        setDescription(data.description);
        console.log(data.description);
        setAttendanceDay(data.attendanceDay);
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);
      } else {
        console.log("스터디 상세보기 조회 실패");
      }
    } catch (error) {
      console.error("스터디 상세보기 조회 중 오류 발생 : ", error.response);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  // StudyRecruitEditor 에서 전달한 값을 처리하는 함수
  const handleEditorDataChange = (newContent) => {
    // 자식 컴포넌트로 부터 받은 값을 상태에 따라 저장하거나 원하는 작업을 수행
    setDescription(newContent);
  };

  function removeFormatting(discription) {
    // CKEditor에서 사용하는 서식 태그를 정규 표현식으로 제거
    const formattedText = discription.replace(/<[^>]*>/g, "");
    return formattedText;
  }

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // 셀렉트박스 값 변경 시 상태 업데이트
  };

  const handleCustomSelectChange = (selectedOptions) => {
    setEditedSkillName(selectedOptions);
  };

  const handleRemoveSkill = (index) => {
    // 기존의 기술 스택 배열을 복사
    const updatedSkills = [...skillNames];

    // 선택한 인덱스의 기술 스택을 배열에서 제거
    updatedSkills.splice(index, 1);

    setSkillNames(updatedSkills);
  };

  // 스터디 업데이트를 위한 서비스 함수
  const handleUpdateStudy = async () => {
    try {
      const formattedStartTime = convertToHHMM(
        parseInt(startTime.split(":")[0]) * 60 +
          parseInt(startTime.split(":")[1])
      );
      const formattedEndTime = convertToHHMM(
        parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1])
      );

      const mergedSkills = Array.from(
        new Set([...skillNames, ...editedSkillName])
      );
      console.log("mergedSkills", mergedSkills);

      const updatedStudy = await updateStudy(
        title,
        maxNum,
        study_id,
        mergedSkills,
        description,
        attendanceDay,
        formattedStartTime,
        formattedEndTime,
        startDate,
        endDate
      );
      console.log("수정한 인원입니다. : ", maxNum);
      setEditedSkillName(mergedSkills);
      setIsEditing(false);
      console.log("Study updated successfully", updatedStudy);
    } catch (error) {
      console.error("Error updating study:", error);
    }
  };

  const getInitialOptions = (selectedSkillNames) => {
    // skillNames을 기반으로 선택된 옵션들을 생성
    const initialOptions = selectedSkillNames.map((skillName) => ({
      value: skillName,
      label: skillName,
    }));

    return initialOptions;
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEdit = () => {
    setIsEditing(true); // 수정 버튼 클릭 시 수정 모드로 전환
  };

  // 수정 완료 버튼 클릭 시 호출되는 함수
  const handleFinishEdit = (study_id) => {
    alert("수정하시겠습니까?");
    handleUpdateStudy(); // 서버로 스터디 업데이트 요청
    setIsEditing(false); // 수정 완료 후 수정 모드 종료
    window.location.reload();
  };

  // skill 의 목록을 불러오는 함수
  useEffect(() => {
    const fetchSkillsByPosition = async (position) => {
      try {
        const skillByPosition = await getSkillNameByPosition(position);
        setSkillNames(skillByPosition);
        console.log("skillByPosition", skillByPosition);
      } catch (error) {
        console.error("스킬 이름을 불러오는 중 오류 발생 ", error);
      }
    };
    if (position) {
      fetchSkillsByPosition(position);
    }
  }, [position]);

  // 포지션에 따라 다르게 스킬 이름 불어오는 함수
  useEffect(() => {
    // 포지션이 변경될 때 스킬 이름 가져오기
    if (position) {
      getSkillNameByPosition(position)
        .then((skillNames) => {
          setSkillNames(skillNames);
        })
        .catch((error) => {
          console.error("스킬 이름을 가져오는 중 오류 발생: ", error);
        });
    }
  }, [position]);

  // 요일 목록
  const daysOfWeek = [
    { id: "월요일", label: "월요일" },
    { id: "화요일", label: "화요일" },
    { id: "수요일", label: "수요일" },
    { id: "목요일", label: "목요일" },
    { id: "금요일", label: "금요일" },
    { id: "토요일", label: "토요일" },
    { id: "일요일", label: "일요일" },
  ];



  const handleCheckboxChange = (e) => {
    const selectedDayId = e.target.id;
  
    setAttendanceDay((prevDetail) => {
      const currentAttendanceDay = Array.isArray(prevDetail)
        ? prevDetail
        : [];
  
      if (currentAttendanceDay.includes(selectedDayId)) {
        return currentAttendanceDay.filter((day) => day !== selectedDayId);
      } else {
        return [...currentAttendanceDay, selectedDayId];
      }
    });
  };

  const [isInStudyRoom, setIsInStudyRoom] = useState(false);

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
      console.log("스터디 룸 가입여부 확인", response.data);
    } catch (error) {
      console.error("스터디룸 가입 여부 확인 중 오류 : ", error);
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // 현재 날짜와 비교하여 이후의 날짜만 허용
    const currentDate = new Date();
    if (new Date(newStartDate) >= currentDate) {
      setStartDate(newStartDate);
      setEndDate(""); // 시작 날짜 변경 시 종료 날짜 초기화
    } else {
      // 혹은 다른 처리를 수행할 수 있습니다.
    }
  };

  // 날짜 변경 함수
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (startDate <= newEndDate) {
      setEndDate(newEndDate);
    } else {
      // 종료 날짜가 시작 날짜보다 이전일 경우 예외 처리
      alert("종료 날짜는 시작 날짜보다 이후이어야 합니다.");
    }
  };
  function calculateDefaultPosition(skillNames) {
    if (Array.isArray(skillNames) && skillNames.length > 0) {
      // 만약에 skillNames에 "Frontend"이나 "Backend"이 있다면 해당 포지션 반환
      if (skillNames.includes("Frontend")) return "Frontend";
      if (skillNames.includes("Backend")) return "Backend";
    }
    // 기본적으로 "FullStack" 반환
    return "FullStack";
  }

  return (
    <>
      <StudyRoom_Sidebar />
      <div className="max-w-screen-md max-h-screen mx-auto p-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            {title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {createdAt}
          </p>
          <dt className="text-sm font-medium -leading-6 text-gray-600">
            {" "}
            작성자 | {master}
          </dt>
        </div>

        <div
          className={`text-sm px-2 py-1 w-20 rounded-full ${
            maxNum - currentNum <= 2 && maxNum !== currentNum
              ? "bg-red-400 text-white"
              : maxNum > currentNum
              ? "inline-block bg-green-400 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {maxNum - currentNum <= 2 && maxNum !== currentNum
            ? "마감 임박"
            : maxNum > currentNum
            ? "모집중"
            : "모집 완료"}
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                스터디 이름
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {studyName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                모집 인원
              </dt>
              {isEditing ? (
                <input
                  type="number"
                  id="maxNum"
                  name="maxNum"
                  value={maxNum}
                  onChange={(e) => {
                    // 입력값을 가져옴
                    const inputValue = parseInt(e.target.value, 10);
                    const newValue = inputValue >= 0 ? inputValue : 0;
                    // 상태 업데이트
                    // s({ ...detail, maxNum: newValue });
                    setMaxNum(newValue);
                  }}
                  min={0}
                  max={25}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="최대 인원 수 25명"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {maxNum} 명
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                진행 기간
              </dt>
              {isEditing ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="justify-self-auto">
                    <input
                      value={startDate}
                      onChange={handleStartDateChange}
                      type="date"
                      name="startDate"
                      id="startDate"
                      min={format(new Date(), "yyyy-MM-dd")} // 현재 날짜 이후만 선택 가능
                      className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <input
                      value={endDate}
                      onChange={handleEndDateChange}
                      type="date"
                      name="endDate"
                      id="endDate"
                      min={startDate} // 시작 날짜 이후만 선택 가능
                      className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {startDate} ~ {endDate}
                </dd>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                출석 시간
              </dt>
              {isEditing ? (
                <div className="mt-2.5 mb-4 relative rounded-md shadow-sm">
                  <input
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    id="startTime"
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                </div>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {startTime} ~ {endTime}{" "}
                </dd>
              )}
            </div>
            {isEditing ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols- sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  출석 요일
                </dt>
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day) => (
                    <label
                      key={day.id}
                      className="block rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <input
                        type="checkbox"
                        id={day.id}
                        name="attendanceDay"
                        value={day.id} // 수정된 부분
                        checked={attendanceDay.includes(day.id)}
                        onChange={handleCheckboxChange}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  출석 요일
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {Array.isArray(attendanceDay) &&
                    attendanceDay.map(
                      (
                        selectedDay,
                        index // 배열인지 확인
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                        >
                          {selectedDay}
                        </span>
                      )
                    )}
                </dd>
              </div>
            )}

            {isEditing ? (
              <div className="px-4 py-6 sm:grid sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  기술 스택
                </dt>
                <div>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <span className="text-sm text-thin">
                      (삭제를 원하실 경우 토글을 선택해주세요)
                    </span>
                    <div className="flex flex-wrap">
                      {Array.isArray(skillNames) &&
                        skillNames.map(
                          (
                            skill,
                            index // 배열인지 확인
                          ) => (
                            <span
                              key={index}
                              onClick={() => handleRemoveSkill(index)}
                              className="px-2 py-1 mt-1 ml-1 mb-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                            >
                              {skill} x
                            </span>
                          )
                        )}
                    </div>
                  </dd>
                  <select
                    id="position"
                    name="position"
                    value={calculateDefaultPosition(skillNames)}
                    onChange={handlePositionChange}
                    className="block w-40 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {/* 범위 선택 방식으로 변경하기  */}
                    <option value="">선택</option>
                    <option value="FullStack">풀스택</option>
                    <option value="Frontend">프론트엔드</option>
                    <option value="Backend">백엔드</option>
                  </select>
                  <MultiSelect
                    name="skillNames"
                    value={getInitialOptions(skillNames)}
                    onChange={handleCustomSelectChange}
                    selectedPosition={selectedPosition}
                    placeholder={selectedPosition}
                  />
                </div>
              </div>
            ) : (
              <div className="sm:col-span-4">
                <div className="mt-2.5 mb-4">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      기술 스택
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-wrap">
                        {Array.isArray(skillNames) &&
                          skillNames.map(
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
                </div>
              </div>
            )}

            <div className="px-4 py-6 sm:grid sm:grid-cols-1sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 ">
                소개
              </dt>
              {isEditing ? (
                <StudyRecruitEditor
                  // dangerouslySetInnerHTML={{ __html: plainTextContent }}
                  placeholder={description}
                  data={description}
                  initialContent={description}
                  onContentChange={handleEditorDataChange}
                />
              ) : (
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {ReactHtmlParser(description)}
                </div>
              )}
            </div>
            <div className="mt-10">
              <div className="flex gap-x-3">
                <button
                  type="reset"
                  onClick={() => navigate(`/studyroom/${study_id}/manage`)}
                  className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  취소
                </button>
                {isEditing ? (
                  <form onSubmit={handleFinishEdit}>
                    <button
                      type="submit"
                      className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      수정 완료
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    수정
                  </button>
                )}
              </div>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default StudyModify;
