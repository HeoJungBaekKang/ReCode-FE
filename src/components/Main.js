import React from "react";
import Slider from "react-slick";
import "./Main.css";
import Layout from "./LayoutGrid";
import Search from "./Fix/Search";
import MultiSelect from "./Study/MultiSelect";
import StudyList from "./Mypage/StudyList";
import Dropdowns from "./Fix/Dropdowns"


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
  return (
    <>
      <Layout>
        <section>
          <div
            id="slider-container"
            class="w-1800px mx-auto 
      mt-12"
          >
            <Slider {...settings}>
              <article
                style={{ display: "grid !important" }}
                className="shadow-2xl drop-shadow-xl w-80  p-3 rounded-lg  gap-2"
              >
                <h2 className="text-2xl font-bold">공지사항</h2>
                <p className="text-gray-800">- 자세한 내용은 클릭</p>
              </article>
              <article
                style={{ display: "grid !important" }}
                className="shadow-2xl drop-shadow-xl w-80  p-3 rounded-lg  gap-2"
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
              <button button className="custom-button text-2xl text-black">
                <h1>전체보기</h1>
              </button>
            </div>
            <div>
              <button className="custom-button text-2xl text-black">
                <h1>백엔드</h1>
              </button>
            </div>
            <div>
              <button className="custom-button text-2xl text-black">
                <h1>프론드엔드</h1>
              </button>
            </div>

            <div className="col-end-9 col-span-2">
              <Search></Search>
            </div>

            <div className="">
              <label
                htmlFor="skill_select"
                className="block text-xl font-semibold leading-6 text-gray-900"
              >
                기술 스택 선정
              </label>
            </div>
            <div className="col-start-2 col-span-4 ml-6">
              <MultiSelect />
            </div>
        <Dropdowns />
          </div>
        </div>
            <StudyList/>

      </Layout>
    </>
  );
};
export default Main;
