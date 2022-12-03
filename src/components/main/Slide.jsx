import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LOGOWHITE from "../../assets/LOGOWHITE.svg";

const Slide = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-CC w-[339px] h-[180px] mx-auto rounded-md">
      <Slider {...settings}>
        <div className="bg-transparent h-[140px] text-white p-4 ml-2">
          <img className="w-2/5" src={LOGOWHITE} />
          <div className="mt-3 ">
            애플 중고거래
            <br />
            파인드애플로 시작하세요!
          </div>
        </div>
        <div className="bg-transparent h-[140px] text-white p-6 mt-2 text-xl">
          설문조사
          <div className=" mt-2 text-base">참여시 경품을 드립니다!</div>
        </div>
        <div className="bg-transparent h-[140px] text-white p-6 mt-2 text-xl">
          ????
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
