import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getPost, __searchPost } from "../redux/modules/PostsSlice";
import PostSearch from "../components/PostSearch";
import { __getPostDetail } from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { __postList } from "../redux/modules/PostsSlice";
import SortBar from "../components/SortBar";
import styled from "styled-components";
import ChatList from "../pages/chatting/element/ChatList";
import chat from "../assets/chat.png";

const PostRead = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { postsCount } = useSelector((state) => state.posts);
  const { HeaderState } = useSelector((state) => state.posts);
  const [submitObj, setSubmitObj] = useState(HeaderState);

  console.log("postspostsposts", posts);
  useEffect(() => {
    dispatch(__getPost(submitObj));
    setSubmitObj({ ...submitObj, pageNumber: 0 });
  }, [params]);
  
// 채팅 modal창 상태 관리
const [isChatModal, setIsChatModal] = useState(false);
const popupPostCode = () => {
  setIsChatModal(!isChatModal)
}
  return (
    <div>
      <Layout>
        <READ>
          <PostSearch __search={__searchPost} />
          <Header
            state={submitObj}
            setState={setSubmitObj}
            Navigate={"/postread"}
          />
          <SortBar
            postsCount={postsCount}
            state={submitObj}
            setState={setSubmitObj}
            Navigate={"/postread"}
            postId="postId"
            postLikeCnt="postLikeCnt"
          />
          <PostList
            state={submitObj}
            setState={setSubmitObj}
            posts={posts}
            detail={"/PostDetail"}
            __getDetail={__getPostDetail}
          />
        <ChatButton onClick={popupPostCode}><img src={chat}/>채팅</ChatButton>
        {isChatModal && (
        <ModalWrap onClick={popupPostCode}>
        <ChatList />
        </ModalWrap>
        )}
          <Footer />
        </READ>
      </Layout>
    </div>
  );
};

export default PostRead;

const READ = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

// modal 버튼
const ChatButton = styled.button`
width: 79px;
height: 45px;
background: #3D6AF2;
border-radius: 30px;
position : fixed;
bottom: 70px;
right : 10px;
`
// modal 닫기
const ModalWrap=styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.4);
display: flex;
justify-content: center;
align-items: center;
z-index: 998;
padding: 0 15px;
box-sizing: border-box;
`