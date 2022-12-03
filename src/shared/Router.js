import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pricingfinal from "../components/price/Pricingfinal";
import PricingText from "../components/price/PricingText";
import ObjectionComment from "../pages/issues/ObjectionComment";
import SignIn from "../pages/login/SignIn";
import Main from "../pages/Main";
import MyLike from "../pages/mypage/MyLike";
import PostComment from "../pages/posts/PostComment";
import PricingPage from "../pages/PricingPage";
import SellerPage from "../pages/SellerPage";
import SignUp from "../pages/login/SignUp";
import PostCreate from "../pages/posts/PostCreate";
import PostRead from "../pages/posts/PostRead";
import PostUpdate from "../pages/posts/PostUpdate";
import PostDetail from "../pages/posts/PostDetail";
import ObjectionCreate from "../pages/issues/ObjectionCreate";
import ObjectionRead from "../pages/issues/ObjectionRead";
import ObjectionUpdate from "../pages/issues/ObjectionUpdate";
import ObjectionDetail from "../pages/issues/ObjectionDetail";
import Mypage from "../pages/mypage/Mypage";
import MypageUpdate from "../pages/mypage/MypageUpdate";
import Redirect from "../components/login/Redirect";
import MyObjection from "../pages/mypage/MyObjection";
import MyPost from "../pages/mypage/MyPost";
import RedirectLogout from "../components/login/RedirectLogout";
import Cover from "../pages/introduce/Cover";
import Info1 from "../pages/introduce/Info1";
import Info2 from "../pages/introduce/Info2";
import Info3 from "../pages/introduce/Info3";
import Chatting from "../pages/chatting/Chatting";

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
        <Route path="/postread/:category" element={<PostRead />} />
        <Route path="/postread/:category/:sort" element={<PostRead />} />
        {/* 게시글 업데이트로 이동하기 */}
        <Route path="/postupdate/:id" element={<PostUpdate />} />
        {/* 포스트리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path="/PostDetail/:id" element={<PostDetail />} />
        {/*게시물 댓글 페이지 */}
        <Route path="/postComment/:id" element={<PostComment />} />

        {/* 이의제기 리스트 생성 페이지로 이동하기 */}
        <Route path="/objectioncreate" element={<ObjectionCreate />} />
        {/* 이의제기 홈으로 이동하기 */}
        <Route path="/objectionread/:category" element={<ObjectionRead />} />
        <Route
          path="/objectionread/:category/:sort"
          element={<ObjectionRead />}
        />
        {/* 이의제기 업데이트로 이동하기 */}
        <Route path="/objectionupdate/:id" element={<ObjectionUpdate />} />
        {/* 이의제기리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path="objectionDetail/:id" element={<ObjectionDetail />} />
        {/*이의제기 댓글 페이지 */}
        <Route path="/objectionComment/:id" element={<ObjectionComment />} />

        {/* 마이 페이지 이동하기 */}
        <Route path="/mypage" element={<Mypage />} />
        {/* 내정보 업데이트 페이지 이동하기 */}
        <Route path="/mypageupdate" element={<MypageUpdate />} />
        {/* 찜목록 페이지 이동하기 */}
        <Route path="/mylike" element={<MyLike />} />
        {/* 내 이의제기 페이지 이동하기 */}
        <Route path="/myobjection" element={<MyObjection />} />
        {/* 내 게시물 페이지 이동하기 */}
        <Route path="/mypost" element={<MyPost />} />

        {/* main 페이지 이동하기 */}
        <Route path="/main" element={<Main />} />

        {/* 판매자 페이지 이동하기 */}
        <Route path="/sellerpage/:memberId" element={<SellerPage />} />

        {/*가격 책정 페이지 */}
        <Route path="/pricingPage" element={<PricingPage />} />

        {/*가격 결정 페이지 */}
        <Route path="/pricingfinal" element={<Pricingfinal />} />

        {/*상세내용 확인 페이지 */}
        <Route path="/pricingtext" element={<PricingText />} />

        {/*소개페이지 */}
        <Route path="/" element={<Cover />} />
        <Route path="/introduction1" element={<Info1 />} />
        <Route path="/introduction2" element={<Info2 />} />
        <Route path="/introduction3" element={<Info3 />} />

        {/*채팅페이지 */}
        <Route path="/chatting/:roomId" element={<Chatting />} />

        {/* 카카오 소셜 로그인 */}
        <Route path="/KAKAO" element={<Redirect />} />
        <Route path="/KAKAO/LOGOUT" element={<RedirectLogout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
