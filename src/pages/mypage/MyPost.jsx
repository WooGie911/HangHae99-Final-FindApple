import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyPost } from "../../redux/modules/MypageSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import styled from "styled-components";
import backArrow from "../../assets/backArrow.svg";
import mainHeart from "../../assets/mainHeart.svg";

const MyPost = () => {
  const { posts } = useSelector((state) => state.mypage);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyPost());
  }, []);
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <img
          className="cursor-pointer h-6 w-6 absolute left-3"
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>
          <div>내가 작성한 게시물 </div>
        </div>
      </div>

      <div className=" p-3 mt-5 grid grid-cols-2">
        {posts &&
          posts.map((post) => {
            return (
              <div
                className="cursor-pointer bg-white p-2 mx-1 mt-2 rounded-md drop-shadow-lg"
                key={post.postId}
                onClick={() => {
                  navigate(`/PostDetail/${post.postId}`);
                }}
              >
                <img
                  className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-md  "
                  src={post.images[0].imgUrl}
                />
                <div className=" p-1">
                  <div>{post.userPrice.toLocaleString("ko-KR")}원</div>
                  <div className="text-sm  text-OO">{post.title}</div>
                  <div className="flex text-xs ">
                    <img src={mainHeart} />
                    <div className="ml-1 text-DD">{post.likeCnt}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="h-16" />
      <Footer />
    </Layout>
  );
};

export default MyPost;
