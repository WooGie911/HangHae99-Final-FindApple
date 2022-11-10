import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PostCreate from "../pages/PostCreate";
import PostRead from "../pages/PostRead";
import PostUpdate from "../pages/PostUpdate";
import PostDetail from "../pages/PostDetail";
import ObjectionCreate from "../pages/ObjectionCreate";
import ObjectionRead from "../pages/ObjectionRead";
import ObjectionUpdate from "../pages/ObjectionUpdate";
import ObjectionDetail from "../pages/ObjectionDetail";
import Mypage from "../pages/Mypage";
import MypageUpdate from "../pages/MypageUpdate";
import Main from "../pages/Main";
import Redirect from "../components/Redirect";
import SellerPage from "../pages/SellerPage";
import MyLike from "../pages/MyLike";
import MyObjection from "../pages/MyObjection";
import MyPost from "../pages/MyPost";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 이동하기 */}
        <Route path="/signin" element={<SignIn />} />

        {/* 회원가입 페이지 이동하기 */}
        <Route path="/signup" element={<SignUp />} />

        {/* 포스트 리스트 생성 페이지로 이동하기 */}
        <Route path="/postcreate" element={<PostCreate />} />

        {/* 게시글 홈으로 이동하기 */}
        <Route path="/postread" element={<PostRead />} />

        {/* 게시글 업데이트로 이동하기 */}
        <Route path="/postupdate" element={<PostUpdate />} />

        {/* 포스트리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path="/PostDetail/:id" element={<PostDetail />} />

        {/* 이의제기 리스트 생성 페이지로 이동하기 */}
        <Route path="/objectioncreate" element={<ObjectionCreate />} />

        {/* 이의제기 홈으로 이동하기 */}
        <Route path="/objectionread" element={<ObjectionRead />} />

        {/* 이의제기 업데이트로 이동하기 */}
        <Route path="/objectionupdate" element={<ObjectionUpdate />} />

        {/* 이의제기리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path="objectionDetail/:id" element={<ObjectionDetail />} />

        {/* 개인 페이지 이동하기 */}
        <Route path="/mypage" element={<Mypage />} />

        {/* 개인 페이지 업데이트 이동하기 */}
        <Route path="/mypageupdate" element={<MypageUpdate />} />

        {/* main 페이지 이동하기 */}
        <Route path="/" element={<Main />} />
        
        {/* 판매자 페이지 이동하기 */}
        <Route path="/sellerpage" element={<SellerPage />} />        

        {/* 찜하기 페이지 이동하기 */}
        <Route path="/mylike" element={<MyLike />} />  

         {/* 내 이의제기 페이지 이동하기 */}
         <Route path="/myobjection" element={<MyObjection />} />        

         {/* 내 이의제기 페이지 이동하기 */}
         <Route path="/mypost" element={<MyPost />} />   

        <Route
          path="https://localhost:3000/kakaoLogin"
          element={<Redirect />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
