import React from "react";
import Slider from 'react-slick';
import "./Main.css";
import Layout from './LayoutGrid';
import Searchbar from './Fix/Searchbar';
import Skilldropdown from './Fix/Skilldropdown';

const Main = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'theClass',
        arrows: false
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
                                style={{ display: 'grid !important' }}
                                className="shadow-2xl drop-shadow-xl w-80  p-3 rounded-lg  gap-2"
                            >
                                <h2 className="text-2xl font-bold">공지사항</h2>
                                <p className="text-gray-800">
                                    - 자세한 내용은 클릭
                                </p>
                            </article>
                            <article
                                style={{ display: 'grid !important' }}
                                className="shadow-2xl drop-shadow-xl w-80  p-3 rounded-lg  gap-2"
                            >
                                <h2 className="text-2xl font-bold">
                                    채용 공고
                                </h2>
                                <p className="text-gray-800">
                                    - 클릭하면 채용 사이트와 연결
                                </p>
                            </article>
                        </Slider>
                    </div><br /><br /><br />
                </section>
                <div className="contents">
            <div className="grid grid-rows-1 grid-flow-col">
                        <Skilldropdown className="inline-block"></Skilldropdown>
                        <Searchbar className="inline-block right:500px"></Searchbar>
                    </div>
            </div>
            </Layout>
        </>
    );
}
export default Main;