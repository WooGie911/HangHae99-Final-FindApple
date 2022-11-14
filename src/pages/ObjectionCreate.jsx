import React from "react";
import Header from "../components/Header";
import PostsCreate from "../components/PostsCreate";
import { __addObjection } from "../redux/modules/ObjectionsSlice";

const ObjectionCreate = () => {
  return (
    <>
      <Header />
      <div>ObjectionCreate</div>

      <PostsCreate __addData={__addObjection} />
    </>
  );
};

export default ObjectionCreate;
