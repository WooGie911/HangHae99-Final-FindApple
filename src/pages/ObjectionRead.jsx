import React, { useEffect } from "react";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getObjection,
  __searchObjection,
} from "../redux/modules/ObjectionsSlice";
import PostSearch from "../components/PostSearch";
import Layout from "../components/Layout"
import Footer from "../components/Footer"
const ObjectionRead = () => {
  const params = useParams();
  console.log("params.category", params.category);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.objections);

  useEffect(() => {
    dispatch(__getObjection(params.category));
  }, [params]);

  return (
    <>
    <Layout>
      <div>ObjectionRead</div>
      <Header />
      <div>{params.category}</div>

      <PostSearch __search={__searchObjection} />
      <PostList
        posts={posts}
        detail={"/objectionDetail"}
        __getDetail={__getObjection}
      />
      <Footer/>
      </Layout>
    </>
  );
};

export default ObjectionRead;
