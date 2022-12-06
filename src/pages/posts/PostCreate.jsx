import React from "react";
import PostsCreate from "../../components/commons/PostsCreate";
import Layout2 from "../../components/commons/Layout2";
import { __addPost } from "../../redux/modules/PostsSlice";
const PostCreate = () => {
  return (
    <Layout2>
      <PostsCreate
        postReqDto={"postReqDto"}
        Navigate={"postread/all"}
        __addData={__addPost}
        post={"post"}
      />
    </Layout2>
  );
};

export default PostCreate;
