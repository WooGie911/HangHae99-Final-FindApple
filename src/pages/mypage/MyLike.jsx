import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyLike } from "../../redux/modules/MypageSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import styled from "styled-components";
import backArrow from "../../assets/backArrow.svg";
import mainHeart from "../../assets/mainHeart.svg";

const MyLike = () => {
  const { likes } = useSelector((state) => state.mypage);
  console.log(likes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyLike());
  }, []);
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <div>
      <Layout>
        <div className="bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
          <img
            className="h-6 w-6 absolute  left-3"
            onClick={onClickHandler}
            src={backArrow}
          />
          <div>찜목록</div>
        </div>

        <div className=" flex relative p-3 mt-5 ">
          {likes &&
            likes.map((like) => {
              return (
                <div
                  className="bg-white p-2 mx-1 mt-2 rounded-md drop-shadow-lg"
                  key={like.postId}
                  onClick={() => {
                    navigate(`/PostDetail/${like.postId}`);
                  }}
                >
                  <img
                    className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-md  "
                    src={like.images[0].imgUrl}
                  />
                  <div className=" p-1">
                    <div>{like.userPrice.toLocaleString("ko-KR")}원</div>
                    <div className="text-sm  text-OO">{like.title}</div>
                    <div className="flex text-xs ">
                      <img src={mainHeart} />
                      <div className="ml-1 text-DD">{like.likeCnt}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="h-16" />

        <Footer />
      </Layout>
    </div>
  );
};

export default MyLike;
//헤더
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 22px;

  img {
    position: absolute;
    left: 10px;
  }
`;

// 아이템

const PostList = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding-bottom: 140px;
`;

const Posts = styled.div`
  margin-bottom: 50px;
  overflow: auto;
`;

const Div = styled.div`
  height: 58px;
  background-color: white;
`;
const SellerPost = styled.div`
  float: left;
  margin-left: 20px;
  img {
    margin: auto;
    position: relative;
    display: flex;
    width: 160px;
    height: 160px;
    border-radius: 5px;
  }
`;

// 타이틀 글자 줄이기
const TitleEdit = styled.div`
  font-size: 12px;
`;
