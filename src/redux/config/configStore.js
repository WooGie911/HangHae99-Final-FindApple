// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/PostsSlice";
import details from "../modules/PostDetailsSlice";
import objections from "../modules/ObjectionsSlice";
import objectionDetails from "../modules/ObjectionDetailsSlice";
import Login from "../modules/LoginSlice";
import mypage from "../modules/MypageSlice"
import sellerpage from "../modules/SellerSlice"


const store = configureStore({
  reducer: { posts, Login, details, objections, objectionDetails, mypage, sellerpage },

  //dev tool을 개발 환경에서만 설정
  // devTools: process.env.REACT_APP_MOD !== "production",
});

export default store;
