import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getObjection,
  __searchObjection,
} from "../redux/modules/ObjectionsSlice";
import PostSearch from "../components/PostSearch";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { __getObjectionDetail } from "../redux/modules/ObjectionDetailsSlice";
import SortBar from "../components/SortBar";
import ObjectionList from "../components/ObjectionList";

const ObjectionRead = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.objections);
  console.log("postspostsposts", posts);
  const initialObj = {
    paramObj: "all",
    pageNumber: 0,
    pageSize: 10,
    postSort: "issuesId",
  };

  const [submitObj, setSubmitObj] = useState(initialObj);

  useEffect(() => {
    dispatch(__getObjection(submitObj));
  }, [params]);

  return (
    <>
      <Layout>
        <div>{params.category}</div>
        <PostSearch __search={__searchObjection} />
        <Header
          state={submitObj}
          setState={setSubmitObj}
          Navigate={"/objectionread"}
        />
        <SortBar
          state={submitObj}
          setState={setSubmitObj}
          Navigate={"/objectionread"}
          postId="issuesId"
          postLikeCnt="issuesLikeCnt"
        />

        <ObjectionList
          posts={posts}
          detail={"/objectionDetail"}
          __getDetail={__getObjectionDetail}
        />
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionRead;
