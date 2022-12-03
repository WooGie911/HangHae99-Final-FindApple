import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import LOGO from "../assets/LOGO.svg";
import bookmark from "../assets/bookmark.svg";
import { initialHeaderState } from "../redux/modules/PostsSlice";
import ChatList from "../pages/chatting/element/ChatList";

import Layout from "../components/commons/Layout";
import Slide from "../components/main/Slide";
import MainHeader from "../components/main/MainHeader";
import MainList from "../components/main/MainList";
import Footer from "../components/commons/Footer";

const Main = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MoreSeeClick = () => {
    dispatch(
      initialHeaderState({
        paramObj: "all",
        pageNumber: 0,
        pageSize: 10,
        postSort: "postLikeCnt",
      })
    );
    navigate("/postread/all/postLikeCnt");
  };

  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <div className="h-[60px] w-full flex justify-between items-center px-[18px]  bg-HC">
          <img src={LOGO} />

          <img
            src={bookmark}
            onClick={() => {
              navigate("/mylike");
            }}
          />
        </div>

        <MainHeader Navigate={"/postread"} />

        <div className="bg-transparent py-[25px]">
          <Slide />
        </div>

        <div className=" flex justify-between mx-[18px] text-lg font-semibold">
          <div>회원님을 위한 추천상품!</div>
          <button className=" text-xs font-medium" onClick={MoreSeeClick}>
            더보기 〉
          </button>
        </div>

        <MainList />

        <div className="h-16" />

        <Footer />
      </Layout>
    </>
  );
};

export default Main;
