import React from "react";
import styled from "styled-components";
import { KAKAO_LOGOUT_URL } from "./elements/LoginKey";

const KakaoLogout = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_LOGOUT_URL;
  };
  return (
    <div>
      <Logout onClick={handleLogin}>로그아웃</Logout>
    </div>
  );
};

export default KakaoLogout;

const Logout = styled.button`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  width: 60px;
  height: 25px;
  border: 1px solid #3d6af2;
  border-radius: 5px;
  background-color: transparent;
  color: #3d6af2;
  cursor: pointer;
`;
