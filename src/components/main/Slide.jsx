import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import "../../assets/css/slide.css";

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

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

  return (
    <div className="bg-CC w-full h-48 my-7  ">
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-48 cursor-pointer"
            src={banner1}
            onClick={() => {
              window.open(
                "https://lime-relation-3b0.notion.site/FindApple-c62a52f11ca249a09852f225c4cf887d"
              );
            }}
          />
        </div>
        <div>
          <img className="w-full h-48" src={banner2} />
        </div>
        <div>
          <img
            className="w-full h-48 cursor-pointer"
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
