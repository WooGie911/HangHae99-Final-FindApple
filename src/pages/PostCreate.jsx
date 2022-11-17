import React from "react";
import Header from "../components/Header";
import PostsCreate from "../components/PostsCreate";
import { __addPost } from "../redux/modules/PostsSlice";

const PostCreate = () => {
  return (
    <>
      <Header />
      <div>상품등록</div>

      <PostsCreate Navigate={"postread/all"} __addData={__addPost} />
    </>
  );
};

export default PostCreate;
