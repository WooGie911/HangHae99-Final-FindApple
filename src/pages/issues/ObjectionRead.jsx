import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  searchObjection,
  __getAddObjection,
} from "../../redux/modules/ObjectionsSlice";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import Header from "../../components/commons/Header";
import { __getObjectionDetail } from "../../redux/modules/ObjectionDetailsSlice";
import SortBar from "../../components/commons/SortBar";
import ObjectionList from "../../components/issues/ObjectionList";
import Search from "../../components/commons/Search";

const ObjectionRead = () => {
  const { posts } = useSelector((state) => state.objections);
  const { postsCount } = useSelector((state) => state.objections);
  const { getState } = useSelector((state) => state.objections);

  useEffect(() => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Layout>
      <Search search={searchObjection} />
      <Header Navigate={"/objectionread"} />
      <SortBar
        postsCount={postsCount}
        Navigate={"/objectionread"}
        postId="issuesId"
        postLikeCnt="issuesLikeCnt"
      />
      <ObjectionList
        search={searchObjection}
        posts={posts}
        detail={"/objectionDetail"}
        __getDetail={__getObjectionDetail}
        getState={getState}
        __getPost={__getAddObjection}
      />

      <Footer />
    </Layout>
  );
};

export default ObjectionRead;
