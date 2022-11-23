import React from "react";
import PostsCreate from "../components/PostsCreate";
import { __addObjection } from "../redux/modules/ObjectionsSlice";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
const ObjectionCreate = () => {
  return (
    <>
      <Layout>
        <PostsCreate
          postReqDto={"issuesRequestDto"}
          Navigate={"objectionread/all"}
          __addData={__addObjection}
        />
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionCreate;
