import React from "react";
import Header from "../components/Header";
import PostsCreate from "../components/PostsCreate";
import { __addObjection } from "../redux/modules/ObjectionsSlice";
import Footer from "../components/Footer"
import Layout from "../components/Layout"
const ObjectionCreate = () => {
  return (
    <>
    <Layout>
      <Header />
      <div>이의제기 등록</div>

      <PostsCreate __addData={__addObjection} />
      <Footer/>
      </Layout>
      <PostsCreate Navigate={"objectionread/all"} __addData={__addObjection} />
    </>
  );
};

export default ObjectionCreate;
