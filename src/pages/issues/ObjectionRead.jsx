import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  __getObjection,
  __searchObjection,
} from "../../redux/modules/ObjectionsSlice";
import PostSearch from "../../components/commons/PostSearch";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import Header from "../../components/commons/Header";
import { __getObjectionDetail } from "../../redux/modules/ObjectionDetailsSlice";
import SortBar from "../../components/commons/SortBar";
import ObjectionList from "../../components/issues/ObjectionList";

const ObjectionRead = () => {
  const { posts } = useSelector((state) => state.objections);
  const { postsCount } = useSelector((state) => state.objections);
  const { HeaderState } = useSelector((state) => state.objections);
  const [submitObj, setSubmitObj] = useState(HeaderState);

  // useEffect(() => {
  //   dispatch(__getObjection(submitObj));
  //   setSubmitObj({ ...submitObj, pageNumber: 0 });
  // }, [params]);

  return (
    <Layout>
      <PostSearch __search={__searchObjection} />
      <Header
        state={submitObj}
        setState={setSubmitObj}
        Navigate={"/objectionread"}
      />
      <SortBar
        postsCount={postsCount}
        state={submitObj}
        setState={setSubmitObj}
        Navigate={"/objectionread"}
        postId="issuesId"
        postLikeCnt="issuesLikeCnt"
      />

      <ObjectionList
        state={submitObj}
        setState={setSubmitObj}
        posts={posts}
        detail={"/objectionDetail"}
        __getDetail={__getObjectionDetail}
      />

      <Footer />
    </Layout>
  );
};

export default ObjectionRead;
