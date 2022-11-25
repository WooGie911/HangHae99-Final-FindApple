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
import PricingInput from "../components/PricingInput";
import Pricingfinal from "../components/Pricingfinal";
import PricingText from "../components/PricingText";
import PostComment from "../pages/PostComment";
import ObjectionComment from "../pages/ObjectionComment";
import RedirectLogout from "../components/RedirectLogout";
import Cover from "../pages/Cover";
import Info1 from "../pages/Info1";
import Info2 from "../pages/Info2";
import Info3 from "../pages/Info3";

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
        <Route path="/pricingInput" element={<PricingInput />} />
        <Route path="/pricingInput/:category" element={<PricingInput />} />
        <Route
          path="/pricingInput/:category/:years"
          element={<PricingInput />}
        />
        <Route
          path="/pricingInput/:category/:years/:model"
          element={<PricingInput />}
        />
        <Route
          path="/pricingInput/:category/:years/:model/:options"
          element={<PricingInput />}
        />

        {/*가격 결정 페이지 */}
        <Route path="/pricingfinal" element={<Pricingfinal />} />

        {/*상세내용 확인 페이지 */}
        <Route path="/pricingtext" element={<PricingText />} />

        {/*소개페이지 */}
        <Route path="/" element={<Cover />} />
        <Route path="/introduction1" element={<Info1 />} />
        <Route path="/introduction2" element={<Info2 />} />
        <Route path="/introduction3" element={<Info3 />} />

        {/* 카카오 소셜 로그인 */}
        <Route path="/KAKAO" element={<Redirect />} />
        <Route path="/KAKAO/LOGOUT" element={<RedirectLogout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
