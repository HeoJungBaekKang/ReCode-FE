import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./Main.css";
import Layout from "./LayoutGrid";
import Search from "./Fix/Search";
import MultiSelect from "./Study/MultiSelect";
import StudyList from "./StudyList";
import MainPageFilter from "./Pages/MainPageFilter";
import Footer from "./Fix/Footer";

const Main = () => {
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

  const handleFilterChange = (selectedTechs) => {
    // 필터링 로직
  };

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
              className="w-full max-w-screen-xl mx-auto mt-12"
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
            <div className="grid grid-rows-1 grid-cols-6">
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
              <div className="grid grid-cols-6">
                <div className="col-start-8 col-span-2 flex justify-end items-center">
                  <button
                    onClick={() => navigate("/client/recruitment")}
                    className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                  >
                    스터디 생성
                  </button>
                </div>
                <br/>
                <div className="col-end-9 col-span-2 flex justify-end items-center">              
                  <Search />
                </div>
              </div>
            </div>
          </div>
          <StudyList />
        </Layout>
        <MainPageFilter onFilterChange={handleFilterChange} />
                {/* 필터링된 스터디 그룹을 표시 */}
      </div>
      <Footer />
    </>
  );
};
export default Main;
