import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { useNavigate } from "react-router-dom";

const Slide = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };

  const onclickHandler = () => {
    window.open(
      "https://www.notion.so/FindApple-93cd2639427e42778be05137b44b9f44"
    );
  };

  return (
    <div className="bg-CC w-full h-48 mb-7  ">
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-48"
            src={banner1}
            onClick={() => {
              window.open(
                "https://shine-industry-2cc.notion.site/FindApple-93cd2639427e42778be05137b44b9f44"
              );
            }}
          />
        </div>
        <div>
          <img className="w-full h-48" src={banner2} />
        </div>
        <div>
          <img
            className="w-full h-48"
            src={banner3}
            onClick={() => {
              window.open("https://forms.gle/47Ajypmv3kfY3AGM6");
            }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
