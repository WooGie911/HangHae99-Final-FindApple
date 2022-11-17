import React from "react";
import PostsCreate from "../components/PostsCreate";
import { __addPost } from "../redux/modules/PostsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
const PostCreate = () => {
  return (
    <>
      <Layout>
        <PostsCreate Navigate={"postread/all"} __addData={__addPost} />
        <Footer />
      </Layout>
    </>
  );
};

export default PostCreate;
