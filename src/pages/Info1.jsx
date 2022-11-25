import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import IMG1 from "../assets/FirstIMG.svg";
import STEP1 from "../assets/1-3.svg";

const Info1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <BackDiv>
          <TITLE>
            <div>애플 중고</div>
            <div>얼마에 팔아야 할까?</div>
          </TITLE>
          <CONTENT>
            <div>
              파인드애플은 <span>애플 중고 물품 가격을 산정</span>하고,
            </div>
            <div>책정된 가격이 마음에 들면</div>
            <div>
              <span>책정된 가격에 판매</span>할 수 있는 서비스입니다.
            </div>
          </CONTENT>
          <img src={IMG1} />
          <STEP src={STEP1} />

          <NextButton
            onClick={() => {
              navigate(`/introduction2`);
            }}
          >
            다음으로
          </NextButton>
        </BackDiv>
      </Layout>
    </>
  );
};

export default Info1;

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
  margin-bottom: 20px;

  div {
    margin-bottom: 3px;
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
  position: relative;
  z-index: 100;

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
  img {
    z-index: 0;
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
