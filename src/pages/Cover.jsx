import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import LOGOWHITE from "../assets/LOGOWHITE.svg";
import { useNavigate } from "react-router-dom";
const Cover = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/introduction1`);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Layout>
        <Back>
          <div>네고말고 이거!</div>
          <img src={LOGOWHITE}></img>
        </Back>
      </Layout>
    </>
  );
};

export default Cover;

const Back = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 812px;
  background-color: #3d6af2;
  div {
    color: white;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
  }
  img {
    width: 143px;
    height: 36px;
  }
`;
