import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/commons/Layout";
import IMG2 from "../../assets/SecondIMG.jpg";
import STEP2 from "../../assets/2-3.svg";

const Info2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <BackDiv>
          <TITLE>
            <div>시세에 맞는 물품들을</div>
            <div>안심하고 구매하세요!</div>
          </TITLE>
          <CONTENT>
            <div>
              <span>애플 심판관이</span> 정해드립니다.
            </div>
          </CONTENT>
          <img src={IMG2} />
          <STEP src={STEP2} />

          <NextButton
            onClick={() => {
              navigate(`/introduction3`);
            }}
          >
            다음으로
          </NextButton>
        </BackDiv>
      </Layout>
    </>
  );
};

export default Info2;

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
