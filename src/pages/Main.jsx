import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import photoIMG from "../assets/photoIMG.png";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import MainList from "../components/MainList";
import Slide from "../components/Slide";

const Main = ({}) => {
  const { user } = useSelector((state) => state.Login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <MainLogo>
          <Title>Findapple</Title>
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

        <MainHeader Navigate={"/postread"} />

        <div>
          <Slide />
        </div>

        <Text>
          회원님을 위한 추천상품!
          <a>
            더보기
            <More_seebutton
              onClick={() => {
                navigate("/pricingfinal");
              }}
            ></More_seebutton>
          </a>
        </Text>

        <MainList />

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

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 100px;
`;
const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
  font: inter;
  margin-top: 40px;
  margin-left: 15px;
  position: relative;
  top: 10px;
  a {
    font-size: 12px;
    position: relative;
    left: 90px;
  }
`;
const More_seebutton = styled.button`
  background-image: url("https://img.icons8.com/material-two-tone/14/null/forward.png");
  width: 14px;
  height: 14px;
  border: 0;
  outline: 0;
  opacity: 0.5;
`;
