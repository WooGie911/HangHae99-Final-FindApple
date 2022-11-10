import React, { useEffect } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getPost, __searchPost } from "../redux/modules/PostsSlice";
import PostSearch from "../components/PostSearch";

const PostRead = () => {
  const params = useParams();
  console.log("params.category", params.category);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(__getPost);
  }, []);

  return (
    <>
      <Header />
      <div>PostRead</div>

      <PostSearch __search={__searchPost} />
      <PostList posts={posts} />
    </>
  );
};

export default PostRead;
