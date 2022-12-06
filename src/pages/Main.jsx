import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import LOGO from "../assets/LOGO.svg";
import bookmark from "../assets/bookmark.svg";
import { initialHeaderState } from "../redux/modules/PostsSlice";
import Layout from "../components/commons/Layout";
import Slide from "../components/main/Slide";
import MainHeader from "../components/main/MainHeader";
import MainList from "../components/main/MainList";
import Footer from "../components/commons/Footer";

const Main = () => {
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

  useEffect(() => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Layout>
        <div className="h-[60px] w-full flex justify-between items-center px-[18px] bg-white">
          <img src={LOGO} />

          <img
            className=" cursor-pointer"
            src={bookmark}
            onClick={() => {
              navigate("/mylike");
            }}
          />
        </div>

        <MainHeader Navigate={"/postread"} />

        <Slide />

        <div className=" flex justify-between mx-[18px] text-lg font-semibold">
          <div>회원님을 위한 추천상품!</div>
          <button
            className="text-DD text-xs font-semibold"
            onClick={MoreSeeClick}
          >
            더보기 〉
          </button>
        </div>

        <MainList />

        <div className="h-10" />

        <Footer />
      </Layout>
    </>
  );
};

export default Main;
