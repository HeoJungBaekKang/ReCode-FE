import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "./Main.css";
import Layout from "./LayoutGrid";
import MainSearch from "./Study/MainSearch";
import StudyList from "./StudyList";
import Footer from "./Fix/Footer";
import { useState } from "react";
import SkillFilter from "./Main/SkillFilter";
import { getStudies, handleSearchKeyword } from "../services/FilterService";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authData } = useContext(AuthContext);
  const [studies, setStudies] = useState([]); // 전체 스터디 목록
  const [filteredStudies, setFilteredStudies] = useState([]); // 필터링된 스터디 목록
  const [selectedSkills, setSelectedSkills] = useState([]); // 사용자가 선택한 스터디 목록

  const [results, setResults] = useState([]);

  useEffect(() => {
    // 초기에 전체 스터디 목록을 로드
    const getSkillNameByPosition = async () => {
      console.log(authData);
      // 스터디 목록을 로드하는 API 호출
      const loadStudies = await getStudies(); // 왜 있는지 모르겠는 코드
      setStudies(loadStudies);
    };
    // getSkillNameByPosition();
  }, []);

  useEffect(() => {
    // 선택된 스킬에 따라 스터디 목록 필터링
    const newFilteredStudies = studies.filter((study) =>
      selectedSkills.some((selectedSkill) =>
        study.skillNames.includes(selectedSkill)
      )
    );
    setFilteredStudies(newFilteredStudies);
  }, [selectedSkills, studies]);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: false,
  };

  const navigate = useNavigate();

  // 공지사항 클릭 시 이동 함수
  const handleNoticeClick = () => {
    // 공지사항 페이지로 이동
    navigate("/notice"); // '/notice'는 실제로 이동할 페이지 경로에 맞게 수정해야 합니다.
  };

  // 스터디 생성 버튼을 눌렀을 때 처리
  // const handleCreateStudy = () => {
  //   if (isLoggedIn) {
  //     // 로그인 상태인 경우 페이지로 이동
  //    navigate("/client/recruitment");
  //   } else {
  //     // 로그인 상태가 아닌 경우 로그인 페이지로 이동 또는 모달 표시 등의 작업 수행
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //     // 또는 로그인 페이지로 이동: history.push("/login");
  //   }
  // };


  const handleNaverBookClick = () => {
    navigate("/naverbook")
  }

  // 키워드 검색 컴포넌트 핸들러 검색 결과 출력  result 에 검색 결과 담김
  const handleSearch = async (searchTerm) => {
    try {
      console.log("허찬 바보 : ", searchTerm);
      const response = await handleSearchKeyword(searchTerm);
      console.log(" response 백승주 바보 : ", response.data);
      setResults(response.data);
      console.log("results 상태 업데이트: ", results);
      console.log("강민희 바보 :", setStudies);
    } catch (error) {
      console.error("검색 중 오류 발생 :", error);
    }
  };

  const displayStudies = results.length > 0 ? results : (filteredStudies.length > 0 ? filteredStudies : studies);
  console.log("Display studies: ", displayStudies);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[3rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1600/1100] w-[110rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6dd5ed] to-[#ff758c] shadow-lg border border-gray-300 opacity-50 sm:left-[calc(50%-55rem)] sm:w-[95rem]"
            style={{
              clipPath: "polygon(45% 5%, 100% 45%, 90% 15%, 85% 0%, 75% 5%, 65% 20%, 55% 50%, 45% 60%, 35% 45%, 25% 25%, 40% 65%, 10% 55%, 20% 90%, 30% 70%, 75% 85%, 70% 30%)",
              transform: 'translate(10px, 10px)', // Adjust the translate values as needed
              transition: 'all 0.3s ease-in-out',
              animation: 'pulse 2s infinite'
            }}
          />
        </div>
        <Layout>
          <section>
            <div
              id="slider-container"
              className="w-full max-w-screen-xl mx-auto mt-12"
            >
              <Slider {...settings}>
                <article
                  onClick={handleNoticeClick} // 클릭 시 이동 함수 호출
                  className="shadow-2xl drop-shadow-xl w-80 p-3 rounded-lg gap-2 mx-auto notice"
                >
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                    <h2 className="text-2xl font-bold">공지사항</h2>
                    <p className="text-gray-800">이번 주 공지사항입니다. </p>
                  </div>
                </article>
                <article
                  style={{ display: "grid !important" }}
                  className="shadow-2xl drop-shadow-xl w-80 p-3 rounded-lg gap-2 mx-auto"
                >
                  <h2 className="text-2xl font-bold">채용 공고</h2>
                  <p className="text-gray-800">- 클릭하면 채용 사이트와 연결</p>
                </article>
                <article
                  onClick={handleNaverBookClick}
                  className="shadow-2xl drop-shadow-xl w-80 p-3 rounded-lg gap-2 mx-auto book-search"
                >
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                    <h2 className="text-2xl font-bold">도서 검색</h2>
                    <p className="text-gray-800">필요한 도서를 검색해보세요!</p>
                  </div>
                </article>
              </Slider>
            </div>
            <br />
            <br />
            <br />
          </section>

          <div className="relative flex justify-between mt-4">
            {/* 스킬 필터 버튼*/}
            <SkillFilter
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              studies={studies}
              setFilteredStudies={setFilteredStudies}
            />

            {/* 검색창과 스터디 생성 버튼 */}
            <div className="flex items-center space-x-4">
              {/* 스터디 생성 버튼 */}
              <button
                onClick={() => navigate("/client/recruitment")}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                스터디 생성
              </button>

              {/* 검색창 */}
              <MainSearch
                onSearch={handleSearch}
                className="mt-4 bg-blue-500 text-white rounded-md"
              />
            </div>
          </div>
          <div className="mt-5">
            <StudyList
              filteredStudies={displayStudies}
              selectedSkills={selectedSkills}
            />
          </div>
        </Layout>
      </div>
      <Footer />
    </>
  );
};
export default Main;