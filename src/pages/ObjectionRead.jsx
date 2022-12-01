import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getObjection,
  __searchObjection,
} from "../redux/modules/ObjectionsSlice";
import PostSearch from "../components/PostSearch";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { __getObjectionDetail } from "../redux/modules/ObjectionDetailsSlice";
import SortBar from "../components/SortBar";
import ObjectionList from "../components/ObjectionList";
import styled from "styled-components";
import ChatList from "../pages/chatting/element/ChatList";
import chat from "../assets/chat.png";

const ObjectionRead = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.objections);
  const { postsCount } = useSelector((state) => state.objections);
  const { HeaderState } = useSelector((state) => state.objections);
  const [submitObj, setSubmitObj] = useState(HeaderState);

  useEffect(() => {
    dispatch(__getObjection(submitObj));
    setSubmitObj({ ...submitObj, pageNumber: 0 });
  }, [params]);

// 채팅 modal창 상태 관리
const [isChatModal, setIsChatModal] = useState(false);
const popupPostCode = () => {
  setIsChatModal(!isChatModal)
}
  return (
    <>
      <Layout>
        <PostSearch __search={__searchObjection} />
        <Header
          state={submitObj}
          setState={setSubmitObj}
          Navigate={"/objectionread"}
        />
        <SortBar
          postsCount={postsCount}
          state={submitObj}
          setState={setSubmitObj}
          Navigate={"/objectionread"}
          postId="issuesId"
          postLikeCnt="issuesLikeCnt"
        />

        <ObjectionList
          state={submitObj}
          setState={setSubmitObj}
          posts={posts}
          detail={"/objectionDetail"}
          __getDetail={__getObjectionDetail}
        />
        <ChatButton onClick={popupPostCode}><img src={chat}/>채팅</ChatButton>
        {isChatModal && (
        <ModalWrap onClick={popupPostCode}>
        <ChatList />
        </ModalWrap>
        )}        
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionRead;
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