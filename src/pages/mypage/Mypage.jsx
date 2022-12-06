import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { __UserProfile } from "../../redux/modules/LoginSlice";
import bookmark from "../../assets/bookmark.svg";
import blackIssue from "../../assets/blackIssue.svg";
import myPosts from "../../assets/myPosts.svg";
import LogoutButton from "../../components/login/LogoutButton";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import mypageArrow from "../../assets/mypageArrow.svg";

const Mypage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const mypageupdate = () => {
    navigate("/mypageupdate");
  };
  const mypost = () => {
    navigate("/mypost");
  };
  const myobjection = () => {
    navigate("/myobjection");
  };
  const mylike = () => {
    navigate("/mylike");
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Login);
  //get 해오기
  useEffect(() => {
    dispatch(__UserProfile());
  }, [params]);

  return (
    <Layout>
      <div className="flex justify-between items-center px-[18px] h-[76px]">
        <div className="text-[18px] font-semibold">내 정보</div>

        <LogoutButton />
      </div>
      <div className=" flex justify-between items-center p-5">
        <img
          className="h-[62px] w-[62px] rounded-full drop-shadow-xl"
          src={user.profileImg}
        />

        <div className=" flex-col mr-20  ">
          <div className=" font-semibold">{user.nickname}</div>
          <div className=" text-sm text-medium text-CC">{user.email}</div>
        </div>

        <img
          className=" cursor-pointer h-7 w-7"
          onClick={mypageupdate}
          src={mypageArrow}
        />
      </div>

      <div className=" p-5 font-medium ">
        <div className="bg-white rounded-md drop-shadow-xl">
          <div className="bg-white p-2 font-semibold rounded-md">나의 활동</div>
          <div className="flex-col h-full content-center justify-center items-center p-1">
            <div className="bg-white flex relative p-1 my-3">
              <img className="px-1 w-8 " src={myPosts} />
              <div>내가 작성한 게시물</div>
              <img
                className=" absolute right-0 cursor-pointer"
                onClick={mypost}
                src={mypageArrow}
              />
            </div>

            <div className="bg-white relative flex p-1 my-3">
              <img className="px-1 w-8" src={blackIssue} />
              <div>이의제기</div>
              <img
                className=" absolute right-0 cursor-pointer"
                onClick={myobjection}
                src={mypageArrow}
              />
            </div>

            <div className="bg-white flex relative p-1 my-3">
              <img className="px-1 w-8" src={bookmark} />
              <div>찜목록</div>
              <img
                className=" absolute right-0 cursor-pointer"
                onClick={mylike}
                src={mypageArrow}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default Mypage;
