import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout2 from "../../components/commons/Layout2";
import IMG1 from "../../assets/IMG1.jpg";
import STEP1 from "../../assets/1-3.svg";

const Onboarding1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout2>
        <div className="flex  justify-center items-center h-[100vh]">
          <ul className="flex-col ">
            <li className="flex-col text-2xl font-semibold mb-12">
              <div className="flex justify-center">애플 중고</div>
              <div className="flex justify-center">얼마에 팔아야 할까?</div>
            </li>
            <li className="flex-col justify-center text-sm text-DD">
              <div className="flex justify-center">
                파인드애플은{" "}
                <div className="text-CC">애플 중고 물품 가격을 산정</div>하고,
              </div>
              <div className="flex justify-center">
                책정된 가격이 마음에 들면
              </div>
              <div className="flex justify-center">
                <div className="text-CC">책정된 가격에 판매</div>할 수 있는
                서비스입니다.
              </div>
            </li>
            <li className="flex justify-center mt-28">
              <img src={IMG1} />
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center absolute w-full bottom-14 p-5 ">
          <img src={STEP1} />
        </div>
        <button
          className=" absolute bottom-0 w-full h-14 text-white bg-CC"
          onClick={() => {
            navigate(`/onboarding2`);
          }}
        >
          다음으로
        </button>
      </Layout2>
    </>
  );
};

export default Onboarding1;

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
