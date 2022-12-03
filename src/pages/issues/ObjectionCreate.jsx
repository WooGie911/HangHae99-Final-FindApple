import React from "react";
import PostsCreate from "../../components/commons/PostsCreate";
import { __addObjection } from "../../redux/modules/ObjectionsSlice";
import Footer from "../../components/commons/Footer";
import Layout from "../../components/commons/Layout";
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
