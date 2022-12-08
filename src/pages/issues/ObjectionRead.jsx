import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  __getObjection,
  searchObjection,
} from "../../redux/modules/ObjectionsSlice";
import PostSearch from "../../components/commons/PostSearch";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import Header from "../../components/commons/Header";
import { __getObjectionDetail } from "../../redux/modules/ObjectionDetailsSlice";
import SortBar from "../../components/commons/SortBar";
import ObjectionList from "../../components/issues/ObjectionList";
import { useEffect } from "react";

const ObjectionRead = () => {
  const { posts } = useSelector((state) => state.objections);
  const { postsCount } = useSelector((state) => state.objections);
  const { HeaderState } = useSelector((state) => state.objections);
  const [submitObj, setSubmitObj] = useState(HeaderState);

  useEffect(() => {
    setSubmitObj({ ...submitObj, pageNumber: 0 });
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Layout>
      <PostSearch search={searchObjection} />
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
        search={searchObjection}
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
