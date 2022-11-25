import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getPost, __searchPost } from "../redux/modules/PostsSlice";
import PostSearch from "../components/PostSearch";
import { __getPostDetail } from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { __postList } from "../redux/modules/PostsSlice";
import SortBar from "../components/SortBar";
import styled from "styled-components";

const PostRead = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { postsCount } = useSelector((state) => state.posts);
  const { HeaderState } = useSelector((state) => state.posts);
  const [submitObj, setSubmitObj] = useState(HeaderState);

  console.log("postspostsposts", posts);
  useEffect(() => {
    dispatch(__getPost(submitObj));
    setSubmitObj({ ...submitObj, pageNumber: 0 });
  }, [params]);

  return (
    <div>
      <Layout>
        <READ>
          <PostSearch __search={__searchPost} />
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
            state={submitObj}
            setState={setSubmitObj}
            posts={posts}
            detail={"/PostDetail"}
            __getDetail={__getPostDetail}
          />
          <Footer />
        </READ>
      </Layout>
    </div>
  );
};

export default PostRead;

const READ = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
