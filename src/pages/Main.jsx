import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import photoIMG from "../assets/photoIMG.png";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Main = () => {
  const { user } = useSelector((state) => state.Login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("Access_Token");
  const refreshToken = localStorage.getItem("Refresh_Token");

  const nickname = localStorage.getItem("nickname");
  const profileIMG = localStorage.getItem("profileIMG");

  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <MainLogo>
          <div>Main로고 예정</div>
          <br />

          <img
            src={
              user.profileImg == (null || undefined)
                ? photoIMG
                : user.profileImg
            }
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </MainLogo>
        <Header Navigate={"/postread"} />
        <br />
        <div>앱소개 또는 배너</div>
        <br />
        <div>
          <div>회원님을 위한 추천상품!</div>

          <div>추천상품 리스트업</div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Main;

const MainLogo = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
