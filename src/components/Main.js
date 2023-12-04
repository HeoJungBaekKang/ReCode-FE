import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "./Main.css";
import Layout from "./LayoutGrid";
import Search from "./Fix/Search";
import StudyList from "./StudyList";
import Footer from "./Fix/Footer";
import { useState } from "react";
import SkillFilter from "./Main/SkillFilter";
import { getStudies } from "../services/FilterService";

const Main = () => {
  const { authData } = useContext(AuthContext);
  const [studies, setStudies] = useState([]); // 전체 스터디 목록
  const [filteredStudies, setFilteredStudies] = useState([]); // 필터링된 스터디 목록
  const [selectedSkills, setSelectedSkills] = useState([]); // 사용자가 선택한 스터디 목록

  useEffect(() => {
    // 초기에 전체 스터디 목록을 로드
    const getSkills = async () => {
      console.log(authData);
      // 스터디 목록을 로드하는 API 호출
      const loadStudies = await getStudies(); // 왜 있는지 모르겠는 코드
      setStudies(loadStudies);
    };
    getSkills();
  }, []);

  useEffect(() => {
    // 선택된 스킬에 따라 스터디 목록 필터링
    const newFilteredStudies = studies.filter((study) =>
      selectedSkills.every((selectedSkill) =>
        study.skillNames.includes(selectedSkill)
      )
    );
    setFilteredStudies(newFilteredStudies);
  }, [selectedSkills, studies]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
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

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Layout>
          <section>
            <div
              id="slider-container"
              class="w-full max-w-screen-xl mx-auto mt-12"
            >
              <Slider {...settings}>
                <article
                  onClick={handleNoticeClick} // 클릭 시 이동 함수 호출
                  style={{ display: "grid !important" }}
                  className="shadow-2xl drop-shadow-xl w-80 p-3 rounded-lg gap-2 mx-auto"
                >
                  <h2 className="text-2xl font-bold">공지사항</h2>
                  <p className="text-gray-800">이번 주 공지사항입니다. </p>
                </article>
                <article
                  style={{ display: "grid !important" }}
                  className="shadow-2xl drop-shadow-xl w-80 p-3 rounded-lg gap-2 mx-auto"
                >
                  <h2 className="text-2xl font-bold">채용 공고</h2>
                  <p className="text-gray-800">- 클릭하면 채용 사이트와 연결</p>
                </article>
              </Slider>
            </div>
            <br />
            <br />
            <br />
          </section>

          <div className="fixed-container">
            <div class="grid grid-rows-1 grid-cols-6">
              <div>
                <button className="custom-button text-2xl font-semibold text-black bg-transparent hover:text-gray-500 focus:text-gray-500 hover:bg-transparent focus:bg-transparent">
                  <h1>전체보기</h1>
                </button>
              </div>

              <div>
                <button className="custom-button text-2xl font-semibold text-black bg-transparent hover:text-gray-500 focus:text-gray-500 hover:bg-transparent focus:bg-transparent">
                  <h1>백엔드</h1>
                </button>
              </div>

              <div>
                <button className="custom-button text-2xl font-semibold text-black bg-transparent hover:text-gray-500 focus:text-gray-500 hover:bg-transparent focus:bg-transparent">
                  <h1>프론트엔드</h1>
                </button>
              </div>

              {/* 스터디 생성 버튼 */}
              <div class="col-start-6">
                <button
                  onClick={() => navigate("/client/recruitment")}
                  className="col-start-6 mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                  <h1>스터디 생성</h1>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-4"></div>

          <div class="grid grid-cols-6 gap-6">
            <div class="col-start-1 px-8"></div>
            <div class="col-start-5 col-span-2">
              <Search className="mt-4 p-2 bg-blue-500 text-white rounded-md"></Search>
            </div>
          </div>

          {/* 필터링 버튼 */}
          <SkillFilter
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            studies={studies} // 스터디 데이터 전달
            setFilteredStudies={setFilteredStudies}
          />

          <StudyList
            filteredStudies={filteredStudies}
            selectedSkills={selectedSkills}
          />
         
        </Layout>
      </div>
      <Footer />
    </>
  );
};
export default Main;
