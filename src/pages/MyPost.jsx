import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyPost } from "../redux/modules/MypageSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import styled from "styled-components";
import back from "../assets/back.png";


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
    <div>
      <Layout>
      <HeadContainer>
          <div>
            <img
              onClick={onClickHandler}
              style={{ width: 25, height: 25 }}
              src={back}
            />
            <span>내가 쓴 글</span>
          </div>
        </HeadContainer>
        <hr />
        <PostList>
              <Posts>
        {posts.length > 0 && (
          <div>
            {posts.map((post) => {
              return (
                <SellerPost key={post.postId}>
                  <img src={post.images[0].imgUrl} onClick={() => {navigate(`/PostDetail/${post.postId}`)}} />
                  <div>{post.userPrice}원</div>
                  <TitleEdit>{post.title}</TitleEdit>
                  <LikeCnt>🤍{post.likeCnt}</LikeCnt>
                </SellerPost>
              );
            })}
          </div>
        )}
                      </Posts>
            </PostList>
        <Footer />
      </Layout>
    </div>
  );
};

export default MyPost;
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
  overflow: auto;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding-bottom: 140px;
`;

const Posts = styled.div`
  margin-bottom: 50px;
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
const TitleEdit=styled.div`
font-size: 12px;
`

//찜하기
const LikeCnt = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #595959;
`;