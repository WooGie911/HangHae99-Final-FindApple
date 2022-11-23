import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyLike } from "../redux/modules/MypageSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import styled from "styled-components";
import back from "../assets/back.png";
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
        <HeadContainer>
          <div>
            <img
              onClick={onClickHandler}
              style={{ width: 25, height: 25 }}
              src={back}
            />
            <span>내가 찜한 글</span>
          </div>
        </HeadContainer>
        <hr />
        <PostList>
              <Posts>        
        {likes.length > 0 && (
          <>
            {likes.map((like) => {
              return (
                <SellerPost key={like.postId}>
                  <br />
                  <img
                    src={like.images[0].imgUrl} onClick={() => {navigate(`/PostDetail/${like.postId}`)}}/>
                  <div>{like.userPrice}원</div>                  
                  <TitleEdit>{like.title}</TitleEdit>
                  <TitleEdit>{like.nickname}</TitleEdit>
                  <br />
                </SellerPost>
              );
            })}
          </>
        )}
                      </Posts>
                      <Div></Div>
            </PostList>        
        <Footer />
      </Layout>
    </div>
  );
};

export default MyLike;
//헤더
const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;
  margin-bottom: 20px;
  img {
    float: left;
    margin-right: 110px;
  }
  span {
    /* text-align: center; */
    font-size: 24px;
    font-weight: bold;
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

const Div=styled.div`
height: 58px;
background-color: white;
`
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
const TitleEdit=styled.div`
font-size: 12px;
`