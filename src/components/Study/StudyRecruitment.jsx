import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MultiSelect from "./MultiSelect";
import axios from "axios";

export default function StudyRecruitment() {
  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const [write, setWrite] = useState({
    study_name: "",
    title: "",
    description: "",
    skills: "",
    start_time: "",
    end_time: "",
    start_date: "",
    end_date: "",
    max_num: "",
    user_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setWrite({
      ...write,
      [name]: value,
    });
  };
  const submitWrite = async (e) => {
    e.preventDefault();

    try {
      // Axios post 요청
      const response = await axios
        .post("http://localhost:8081/api/v1/study", write, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${authData.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          const code = response.data.code;

          if (code === 1) {
            navigate("/");
          } else {
            console.log("글 저장 실패");
          }
        });
    } catch (error) {
      console.log("모집 글 작성 중 오류 발생", error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          스터디 기본 정보를 입력해주세요
        </h2>
      </div>
      <form onSubmit={submitWrite} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="flex gap-x-3">
          <div className="sm:col-span-2">
            <div class="w-48">
              <label
                htmlFor="max-num"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                모집인원
              </label>
              <select
                id="max_num"
                name="max_num"
                value={write.max_num}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
                <option value="7">7명</option>
                <option value="8">8명</option>
                <option value="9">9명</option>
                <option value="10">10명 이상</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="w-48">
              <label
                htmlFor="skill"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                모집구분
              </label>

              <select
                id="skills"
                name="skills"
                value={write.skills}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
              >
                <option>선택</option>
                <option value="1">백엔드</option>
                <option value="2">프론트엔드</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            스터디 시작 날짜
          </label>
          <div className="mt-1">
            <input
              value={write.start_date}
              onChange={handleInputChange}
              type="date"
              name="start_date"
              id="start_date"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            스터디 종료 날짜
          </label>
          <div className="mt-1">
            <input
              value={write.end_date}
              onChange={handleInputChange}
              type="date"
              name="end_date"
              id="end_date"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="study_name"
            className="block text-sm font-semibold leading-2 text-gray-900"
          >
            스터디 이름
          </label>
          <div className="mt-2.5 mb-4">
            <input
              value={write.study_name}
              onChange={handleInputChange}
              type="text"
              name="study_name"
              id="study_name"
              autoComplete="study_name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <MultiSelect
            value={write.skills || null}
            name="skills"
            onChange={handleInputChange}
          />
        </div>

        <div className="sm:col-span-2 mt-2.5">
          <label
            htmlFor="title"
            className="block text-sm font-semibold leading-3 text-gray-900"
          >
            제목
          </label>
          <div className="mt-2.5">
            <input
              value={write.title}
              onChange={handleInputChange}
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
            <textarea
              value={write.description}
              onChange={handleInputChange}
              name="description"
              id="description"
              rows={11}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-x-3">
            <button
              type="reset"
              onClick={() => navigate("/")}
              className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {" "}
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
    </div>
  );
}
