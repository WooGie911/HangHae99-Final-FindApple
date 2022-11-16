import React from "react";
import Header from "../components/Header";
import PostsCreate from "../components/PostsCreate";
import { __addPost } from "../redux/modules/PostsSlice";
import Layout from "../components/Layout"
import Footer from "../components/Footer"
const PostCreate = () => {
  return (
    <>
    <Layout>
      <Header />
      <div>PostCreate</div>

      <PostsCreate __addData={__addPost} />
      <Footer/>
      </Layout>
    </>
  );
};

export default PostCreate;
