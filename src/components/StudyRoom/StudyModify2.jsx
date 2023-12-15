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

const StudyRoomNotLogin = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [position, setPosition] = useState(""); // 포지션 상태
  const [skillNames, setSkillNames] = useState([]); // skillName 목록 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드를 위한 상태
  const [selectedDays, setSelectedDays] = useState([]);
  const [description, setDescription] = useState("");
  const [attendanceDay, setAttendanceDay] = useState([]);
  const plainTextContent = removeFormatting(description);
  const [initialSelectedDays, setInitialSelectedDays] = useState([]);
  // 출석인정 시간
  const [startTime, setStartTime] = useState(""); // 출석 인정 시작 시간
  const [endTime, setEndTime] = useState(""); // 출석 인정 종료 시간

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
  const handleEdit = () => {
    setIsEditing(true); // 수정 버튼 클릭 시 수정 모드로 전환
  };

  // StudyRecruitEditor 에서 전달한 값을 처리하는 함수
  const handleEditorDataChange = (newContent) => {
    // 자식 컴포넌트로 부터 받은 값을 상태에 따라 저장하거나 원하는 작업을 수행
    setDescription(newContent);
    console.log("newContent in form : ", newContent);
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
    setSelectedSkills(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 수정된 데이터를 서버에 전송하는 코드 작성
    setIsEditing(false); // 수정 완료 후 수정 모드 종료
  };

  useEffect(() => {
    const fetchSkillsByPosition = async (position) => {
      try {
        const skillByPosition = await getSkillNameByPosition(position);
        setSkillNames(skillByPosition);
        console.log("${position} skill을  불러왔습니다.", skillByPosition);
      } catch (error) {
        console.error("스킬 이름을 불러오는 중 오류 발생 ", error);
      }
    };
    if (position) {
      fetchSkillsByPosition(position);
    }
  }, [position]);

  useEffect(() => {
    // 포지션이 변경될 때 스킬 이름 가져오기
    if (position) {
      getSkillNameByPosition(position)
        .then((skillNames) => {
          setDetail({ ...detail, skillNames });
        })
        .catch((error) => {
          console.error("스킬 이름을 가져오는 중 오류 발생: ", error);
        });
    }
  }, [position]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // 현재 날짜와 비교하여 이후의 날짜만 허용
    const currentDate = new Date();
    if (new Date(newStartDate) >= currentDate) {
      setDetail({ ...detail, startDate: newStartDate, endDate: "" });
    } else {
      // 혹은 다른 처리를 수행할 수 있습니다.
    }
    setDetail({ ...detail, startDate: newStartDate });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;

    if (detail.startDate <= newEndDate) {
      setDetail({ ...detail, endDate: newEndDate });
    } else {
      // 종료 날짜가 시작 날짜보다 이전일 경우 예외 처리
      alert("종료 날짜는 시작 날짜보다 이후이어야 합니다.");
    }
  };

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
    const dayId = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      // 선택한 요일을 추가
      setSelectedDays([...selectedDays, dayId]);
    } else {
      // 선택한 요일을 제거
      setSelectedDays(selectedDays.filter((day) => day !== dayId));
    }
  };
  const { study_id } = useParams();
  const { authData } = useContext(AuthContext);
  console.log(authData);

  const [badge, setBadge] = useState({
    userId: detail.userId,
    name: "",
  });
  const handleGet = async () => {
    try {
      const response = await axios
        .get(`/api/study/${study_id}`, {
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
          console.log(response.data.data.description);
          setSkillNames(response.data.data.skillNames);
          console.log(response.data.data.skillNames);
          setDescription(response.data.data.description);
          setPosition(response.data.data.position);
          setInitialSelectedDays(response.data.data.attendanceDay);
          setStartTime(response.data.data.setStartTime);
          setEndTime(response.data.data.endDate);
        });
    } catch (error) {
      console.error("스터디 상세보기 조회 중 오류 발생 : ", error.response);
    }
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

      console.log("API Response:", response.data);

      setIsInStudyRoom(response.data);
      console.log("스터디 룸 가입여부 확인", response.data);
    } catch (error) {
      console.error("스터디룸 가입 여부 확인 중 오류 : ", error);
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    // 마지막 날짜와 비교하여 조건을 설정
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleGetBadge = async () => {
    const userId = detail.userId;
    if (!userId) {
      console.log("작성자 아이디 안 불러와졌다.");
      return;
    }

    try {
      const response = await axios.get(`/api/get-badge/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Badge information fetched successfully: ", response.data);
      if (response.data && response.data.code === 1) {
        setBadge(response.data.data);
      } else {
        console.log("Failed to fetch badge information: ", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching badge information: ", error);
    }
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
      <StudyRoom_Sidebar />
      <div className="max-w-screen-md max-h-screen mx-auto p-4">
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            {detail.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {" "}
            {detail.createdAt}{" "}
          </p>
          <dt className="text-sm font-medium -leading-6 text-gray-600">
            {" "}
            작성자 | {badge.name}
            {detail.master}
          </dt>
        </div>

        <div
          className={`text-sm px-2 py-1 w-20 rounded-full ${
            detail.maxNum - detail.currentNum <= 2 &&
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
              {isEditing ? (
                <input
                  type="number"
                  id="maxNum"
                  name="maxNum"
                  value={detail.maxNum}
                  onChange={(e) => {
                    // 입력값을 가져옴
                    const inputValue = parseInt(e.target.value, 10);
                    const newValue = inputValue >= 0 ? inputValue : 0;
                    // const newValue = inputValue >= 25 ? 25 : inputValue;

                    // 상태 업데이트
                    setDetail({ ...detail, maxNum: newValue });
                  }}
                  min={0} // 최소 값 설정
                  max={25} // 최대 값 설정
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="최대 인원 수 25명"
                />
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.maxNum} 명{" "}
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
                      value={detail.startDate}
                      onChange={handleStartDateChange}
                      type="date"
                      name="startDate"
                      id="startDate"
                      min={format(new Date(), "yyyy-MM-dd")} // 현재 날짜 이후만 선택 가능
                      className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <input
                      value={detail.endDate}
                      onChange={handleEndDateChange}
                      type="date"
                      name="endDate"
                      id="endDate"
                      min={detail.startDate} // 시작 날짜 이후만 선택 가능
                      className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.startDate} ~ {detail.endDate}
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
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                </div>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.startTime} ~ {detail.endTime}{" "}
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
                        value={attendanceDay}
                        // checked={selectedDays.includes(day.id)}
                        checked={initialSelectedDays.includes(day.id)}
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
            )}
            {isEditing ? (
              <div className="px-4 py-6 sm:grid sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  기술 스택
                </dt>
                <div>
                  <select
                    id="position"
                    name="position"
                    value={position}
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
                    value={skillNames}
                    onChange={handleCustomSelectChange}
                    selectedPosition={selectedPosition}
                    placeholder={skillNames}
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
                  onContentChange={handleEditorDataChange}
                  dangerouslySetInnerHTML={{ __html: plainTextContent }}
                  placeholder={detail.description}
                  data={detail.description}
                  initialContent={description}
                />
              ) : (
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {ReactHtmlParser(detail.description)}
                </div>
              )}
            </div>
            <div className="mt-10">
              <div className="flex gap-x-3">
                <button
                  type="reset"
                  onClick={() => navigate("/studyroom/manage")}
                  className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  취소
                </button>
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
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

export default StudyRoomNotLogin;
