import React, { useEffect, useState } from "react";
import Header from "../../components/commons/Header";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { searchPost, __getPost } from "../../redux/modules/PostsSlice";
import PostSearch from "../../components/commons/PostSearch";
import { __getPostDetail } from "../../redux/modules/PostDetailsSlice";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import SortBar from "../../components/commons/SortBar";
import { __postList } from "../../redux/modules/PostsSlice";

const PostRead = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { postsCount } = useSelector((state) => state.posts);
  const { searchState } = useSelector((state) => state.posts);

  let searchObj = "";
  if (searchState === "") {
    searchObj = "";
  } else {
    searchObj = `/${searchState}`;
  }

  const [submitObj, setSubmitObj] = useState({
    paramObj: "all",
    pageNumber: 0,
    pageSize: 10,
    postSort: "postId",
    searchObj: searchObj,
  });

  useEffect(() => {
    // dispatch(__getPost(submitObj));
    setSubmitObj({ ...submitObj, pageNumber: 0 });
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return, 아니라면 스크롤 최상단으로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Layout>
      <PostSearch search={searchPost} />
      <Header
        state={submitObj}
        setState={setSubmitObj}
        Navigate={"/postread"}
      />
      <SortBar
        postsCount={postsCount}
        state={submitObj}
        setState={setSubmitObj}
        Navigate={"/postread"}
        postId="postId"
        postLikeCnt="postLikeCnt"
      />
      <PostList
        search={searchPost}
        state={submitObj}
        setState={setSubmitObj}
        posts={posts}
        detail={"/PostDetail"}
        __getDetail={__getPostDetail}
      />

      <Footer />
    </Layout>
  );
};

export default PostRead;
