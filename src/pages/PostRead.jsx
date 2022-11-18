import React, { useEffect } from "react";
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

const PostRead = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(__getPost(params.category));
  }, [params]);

  return (
    <div>
      <Layout>
        <div>{params.category}</div>

        <PostSearch __search={__searchPost} />
        <Header Navigate={"/postread"} />
        <PostList
          posts={posts}
          detail={"/PostDetail"}
          __getDetail={__getPostDetail}
        />
        <Footer />
      </Layout>
    </div>
  );
};

export default PostRead;
