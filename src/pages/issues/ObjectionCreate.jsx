import React from "react";
import PostsCreate from "../../components/commons/PostsCreate";
import { __addObjection } from "../../redux/modules/ObjectionsSlice";
import Layout2 from "../../components/commons/Layout2";
const ObjectionCreate = () => {
  return (
    <>
      <Layout2>
        <PostsCreate
          postReqDto={"issuesRequestDto"}
          Navigate={"objectionread/all"}
          __addData={__addObjection}
        />
      </Layout2>
    </>
  );
};

export default ObjectionCreate;
