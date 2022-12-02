import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoLogout from "./KakaoLogout";
import "../assets/font/font.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const SiteType = window.localStorage.getItem("SITE");
  const onClickButton = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      navigate("/signin");
    }
  };

  return (
    <>
      {SiteType === "KAKAO" ? (
        <KakaoLogout />
      ) : (
        <Logout style={{fontFamily: 'Pretendard-Regular'}} onClick={onClickButton}>로그아웃</Logout>
      )}
    </>
  );
};

export default LogoutButton;

//LogOut
const Logout = styled.button`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  width: 70px;
  height: 25px;
  border: 1px solid #3d6af2;
  border-radius: 5px;
  background-color: transparent;
  color: #3d6af2;
  cursor: pointer;
`;
