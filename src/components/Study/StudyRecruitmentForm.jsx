import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MultiSelect from "./MultiSelect";
import { createStudyRecruitment } from "../../services/StudyRecruitmentService";
import StudyRecruitEditor from "../Editor/StudyRecruitEditor";
import { format, addDays } from "date-fns";
import { getSkillNameByPosition } from "../../services/FilterService";
import Detail from "../StudyRoom/StudyRoom_Detail";
import Footer from "../Fix/Footer";

export default function StudyRecruitment() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedDays, setSelectedDays] = useState([]); // 선택한 요일을 저장하는 배열
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [position, setPosition] = useState(""); // 포지션 상태
  const [skillNames, setSkillNames] = useState([]); // skillName 목록 상태
  const [selectedPosition, setSelectedPosition] = useState(""); // 컴포넌트의 상태
  const [description, setDescription] = useState("");
  const plainTextContent = removeFormatting(description);

  const [time, setTime] = useState(""); // 시간 상태

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value); // 셀렉트박스 값 변경 시 상태 업데이트
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 로직
    console.log("StudyRecruitment 컴포넌트가 마운트됨");
  }, []);

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
          setWrite({ ...write, skillNames });
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

  const isValidTimeFormat = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  // 분 단위의 시간을 HH:MM 형식의 문자열로 변환하는 함수
  const convertToHHMM = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (timeInMinutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 출석인정 시간
  const [startTime, setStartTime] = useState(""); // 출석 인정 시작 시간
  const [endTime, setEndTime] = useState(""); // 출석 인정 종료 시간

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    // 마지막 날짜와 비교하여 조건을 설정
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // 초기값 세팅 부분
  const [write, setWrite] = useState({
    studyName: "",
    title: "",
    description: "",
    skillNames: [],
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    attendanceDay: "",
    maxNum: "",
    userId: authData.id,
  });

  const handleCustomSelectChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const submitWrite = async (e) => {
    e.preventDefault();

    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      alert("시간을 입력해주세요.");

      return;
    }

    try {
      const formattedStartTime = convertToHHMM(
        parseInt(startTime.split(":")[0]) * 60 +
          parseInt(startTime.split(":")[1])
      );
      const formattedEndTime = convertToHHMM(
        parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1])
      );

      const combinedSkills = [...selectedSkills].filter(Boolean);
      // const combinedSkills = [...selectedSkills, write.skills];

      const studyRecruitmentData = {
        ...write,
        skillNames: combinedSkills,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        attendanceDay: selectedDays,
        description: description,
        // 다른 필드들도 추가해야 함
      };

      console.log("studyRecruitmentData : ", studyRecruitmentData);

      const response = await createStudyRecruitment(studyRecruitmentData);

      // 성공 처리: response를 이용하여 처리
      console.log("스터디 모집 글 작성 완료", response);

      navigate("/"); // 목록 페이지 경로로 변경
      // 필요한 리디렉션 또는 다른 동작 수행
    } catch (error) {
      // 오류 처리
      console.error("스터디 모집 글 작성 중 오류 발생", error);
    }
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

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // 현재 날짜와 비교하여 이후의 날짜만 허용
    const currentDate = new Date();
    if (new Date(newStartDate) >= currentDate) {
      setWrite({ ...write, startDate: newStartDate, endDate: "" });
    } else {
      // 혹은 다른 처리를 수행할 수 있습니다.
    }
    setWrite({ ...write, startDate: newStartDate });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;

    if (write.startDate <= newEndDate) {
      setWrite({ ...write, endDate: newEndDate });
    } else {
      // 종료 날짜가 시작 날짜보다 이전일 경우 예외 처리
      alert("종료 날짜는 시작 날짜보다 이후이어야 합니다.");
    }
  };

  return (
    <div>
      <form onSubmit={submitWrite} className="mx-auto mt-16 max-w-3xl sm:mt-20">
        <div className="gird grid-cols-3 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="studyName"
              className="block text-sm font-semibold leading-2 text-gray-900"
            >
              스터디 이름
            </label>
            <div className="mt-2.5 mb-4">
              <input
                value={write.studyName}
                required
                onChange={(e) =>
                  setWrite({ ...write, studyName: e.target.value })
                }
                type="text"
                name="studyName"
                id="studyName"
                autoComplete="studyName"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="mt-2.5 mb-4 w-1/2">
              <label
                htmlFor="maxNum"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                모집인원
              </label>

              <input
                type="number"
                id="maxNum"
                required
                name="maxNum"
                value={write.maxNum}
                onChange={(e) => {
                  // 입력값을 가져옴
                  const inputValue = parseInt(e.target.value, 10);
                  const newValue = inputValue >= 0 ? inputValue : 0;
                  // const newValue = inputValue >= 25 ? 25 : inputValue;

                  // 상태 업데이트
                  setWrite({ ...write, maxNum: newValue });
                }}
                min={0} // 최소 값 설정
                max={25} // 최대 값 설정
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="최대 인원 수 25명"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="justify-self-auto">
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              스터디 시작 날짜
            </label>
            <input
              value={write.startDate}
              required
              onChange={handleStartDateChange}
              type="date"
              name="startDate"
              id="startDate"
              min={format(new Date(), "yyyy-MM-dd")} // 현재 날짜 이후만 선택 가능
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="justify-self-auto">
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              스터디 종료 날짜
            </label>
            <input
              required
              value={write.endDate}
              onChange={handleEndDateChange}
              type="date"
              name="endDate"
              id="endDate"
              min={write.startDate} // 시작 날짜 이후만 선택 가능
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2.5 mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              출석 인정 시작 시간
            </label>
            <div className="mt-2.5 mb-4 relative rounded-md shadow-sm">
              <input
                required
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-2.5 mb-4">
            <label
              htmlFor="endTime"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              출석 인정 마지막 시간
            </label>
            <div className="mt-2.5 mb-4 w-full relative rounded-md shadow-sm">
              <input
                required
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-2.5 mb-4">
          <label
            htmlFor="AttendanceDay"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            스터디 진행 요일
          </label>
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
                  value={write.studyDay}
                  checked={selectedDays.includes(day.id)}
                  onChange={handleCheckboxChange}
                />
                {day.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <div className="mt-2.5 mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              모집 구분
            </label>
            <select
              id="position"
              name="position"
              required
              value={write.position}
              // onChange={(e) =>
              //   setWrite({ ...write, skillNamespostion: e.target.value })
              // }
              onChange={handlePositionChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {/* 범위 선택 방식으로 변경하기  */}
              <option value="">선택</option>
              <option value="FullStack">풀스택</option>
              <option value="Frontend">프론트엔드</option>
              <option value="Backend">백엔드</option>
            </select>
          </div>
          <div className="sm:col-span-4">
            <div className="mt-2.5 mb-4">
              <label
                htmlFor="skillNames"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                기술스택 목록 선택
              </label>
              <MultiSelect
                name="skillNames"
                onChange={handleCustomSelectChange}
                selectedPosition={selectedPosition}
              />
            </div>
            <div className="sm:col-span-4">
              <span className="font-thin text-sm">
                (기술 스택에 없는 경우 고객센터의 Q&A 를 통해서 관리자에게
                요청바랍니다. )
              </span>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 mt-2.5">
          <label
            htmlFor="title"
            className="block text-sm font-semibold leading-3 text-gray-900"
          >
            제목
          </label>
          <div className="mt-2.5 mb-4">
            <input
              required
              value={write.title}
              onChange={(e) => setWrite({ ...write, title: e.target.value })}
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="mt-2.5">
            <div>
              <StudyRecruitEditor
                required
                onContentChange={handleEditorDataChange}
                dangerouslySetInnerHTML={{ __html: plainTextContent }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-x-3">
            <button
              type="reset"
              onClick={() => navigate("/")}
              className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              작성완료
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}
