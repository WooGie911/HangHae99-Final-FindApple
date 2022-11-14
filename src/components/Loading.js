import React from "react";
import styled from "styled-components";
import Spinner from "./elements/Spinner.gif";

//이 컴포넌트의 목적은 로딩 시, 사용자에게 빈 화면을 보여주지 않고
//스피너를 통해 로딩 중이라는 것을 보여주기 위한 목적.

export default () => {
  console.log("로딩");
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
};

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
