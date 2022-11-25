import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import IMG3 from "../assets/ThirdIMG.jpg";
import STEP3 from "../assets/3-3.svg";

const Info3 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <BackDiv>
          <TITLE>
            <div>가격이 마음에 들지 않는다면?</div>
          </TITLE>
          <CONTENT>
            <div>
              <span>이의제기</span>를 통해 유저들과 의견을 나눠보세요.
            </div>
          </CONTENT>
          <img src={IMG3} />
          <STEP src={STEP3} />

          <NextButton
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            바로 시작하기
          </NextButton>
        </BackDiv>
      </Layout>
    </>
  );
};

export default Info3;

const BackDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  min-height: 812px;
  background-color: white;
`;
const TITLE = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
`;

const CONTENT = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 50px;

  div {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #606060;
    span {
      color: #3d6af2;
    }
  }
`;
const STEP = styled.img`
  position: absolute;
  bottom: 100px;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 56px;
  color: white;
  border: none;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  background-color: #4f75ff;
`;
