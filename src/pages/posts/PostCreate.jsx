import React from "react";
import PostsCreate from "../../components/commons/PostsCreate";
import Layout from "../../components/commons/Layout";
import { __addPost } from "../../redux/modules/PostsSlice";
const PostCreate = () => {
  return (
    <>
      <Layout>
        <PostsCreate
          postReqDto={"postReqDto"}
          Navigate={"postread/all"}
          __addData={__addPost}
        />
      </Layout>
    </>
  );
};

export default PostCreate;
