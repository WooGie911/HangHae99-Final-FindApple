import React from "react";
import Layout from "../commons/Layout";

import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../../redux/modules/PriceSlice";
import PricingList from "./PricingList";
import styled from "styled-components";

const Pricingfinal = () => {
  const navigate = useNavigate();

  const checkReally = (data) => {
    if (data === "/main") {
      if (window.confirm(`정말 떠나시겠습니까?`)) {
        navigate(data);
      }
    } else if (data === "/pricingPage") {
      if (window.confirm("모든 데이터를 새로 입력하시겠습니다?")) {
        window.location.replace(data);
      }
    } else if (data === "/postcreate") {
      if (window.confirm(`상품을 등록하시겠습니까?`)) {
        navigate(data);
      }
    } else if (data === "/objectioncreate") {
      if (window.confirm(`가격이 마음에 들지 않으십니까?`)) {
        navigate(data);
      }
    }
  };

  return (
    <>
      <Layout>
        <ContainerDiv>
          <TitleDiv>
            <Backbutton
              onClick={() => {
                navigate(`/pricingPage`);
              }}
            >
              〈
            </Backbutton>
            <Xbutton
              onClick={() => {
                checkReally(`/main`);
              }}
            >
              X
            </Xbutton>
            <span>가격책정</span>
          </TitleDiv>

          <PricingList />
          <Div>
            <StepDiv>
              <StepButton
                onClick={() => {
                  checkReally(`/pricingPage`);
                }}
              >
                <div>처음부터</div> 다시 입력하기
              </StepButton>
            </StepDiv>
            <BottomButtons>
              <NextButton
                onClick={() => {
                  checkReally(`/postcreate`);
                }}
              >
                상품 등록
              </NextButton>
              <NextButton
                onClick={() => {
                  checkReally(`/objectioncreate`);
                }}
              >
                이의 제기
              </NextButton>
            </BottomButtons>
          </Div>
        </ContainerDiv>
      </Layout>
    </>
  );
};

export default Pricingfinal;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ContainerDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: transparent;
  width: 375px;
  height: 100%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  border-bottom: solid 1px gray;
`;

const Backbutton = styled.button`
  position: absolute;
  left: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const Xbutton = styled.button`
  position: absolute;
  right: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const StepDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: relative;
  margin: 30px 0;
  width: 100%;
  height: 56px;
`;

const StepButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  color: gray;
  width: 155px;
  height: 42px;
  border: solid 1px gray;
  border-radius: 20px;
  background-color: transparent;
  div {
    color: #4f75ff;
    padding: 5px;
  }
`;

const BottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-evenly;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: transparent;
`;

const NextButton = styled.button`
  position: relative;
  width: 168px;
  height: 54px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #4f75ff;
`;
