import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Stdivwrap>
        <Slider {...settings}>
          <Carouseldiv>
            <h3>
              애플 중고거래
              <br />
              파인드애플로 시작하세요!
            </h3>
            <p>
              가격측정, 상품판매까지 <br />할 수 있어요.
            </p>
          </Carouseldiv>
          <Carouseldiv2>
            <h3>설문조사</h3>
            <p>참여시 혜택을 드립니다!</p>
          </Carouseldiv2>
          <Carouseldiv3>3</Carouseldiv3>
        </Slider>
      </Stdivwrap>
      <div></div>
    </div>
  );
};

export default Slide;

const Stdivwrap = styled.div`
  margin-top: 15px;
  margin-left: 15px;

  background-color: 3d6af2;
  width: 343px;
  height: 180px;

  h3 {
    line-height: 1.2;
    margin-top: 25px;
  }
  p {
    opacity: 0.5;
    font-size: 14px;
  }
`;

const Carouseldiv = styled.div`
  background-color: white;
  width: 343px;
  height: 180px;
`;
const Carouseldiv2 = styled.div`
  background-color: white;
  width: 343px;
  height: 180px;
`;

const Carouseldiv3 = styled.div`
  background-color: black;
  width: 343px;
  height: 180px;
`;
