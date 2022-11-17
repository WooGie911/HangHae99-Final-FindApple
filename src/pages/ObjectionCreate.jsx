import React from "react";
import Header from "../components/Header";
import PostsCreate from "../components/PostsCreate";
import { __addObjection } from "../redux/modules/ObjectionsSlice";

const ObjectionCreate = () => {
  return (
    <>
      <Header />
      <div>이의제기 등록</div>

      <PostsCreate Navigate={"objectionread/all"} __addData={__addObjection} />
    </>
  );
};

export default ObjectionCreate;
