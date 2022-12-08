import React, { useEffect } from "react";
import Header from "../../components/commons/Header";
import PostList from "../../components/posts/PostList";
import { useSelector } from "react-redux";
import { searchPost, __getAddPost } from "../../redux/modules/PostsSlice";
import { __getPostDetail } from "../../redux/modules/PostDetailsSlice";
import Layout2 from "../../components/commons/Layout2";
import Footer from "../../components/commons/Footer";
import SortBar from "../../components/commons/SortBar";
import { __postList } from "../../redux/modules/PostsSlice";
import Search from "../../components/commons/Search";

const PostRead = () => {
  const { posts } = useSelector((state) => state.posts);
  const { postsCount } = useSelector((state) => state.posts);
  const { getState } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return, 아니라면 스크롤 최상단으로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Layout2>
      <Search search={searchPost} />
      <Header Navigate={"/postread"} />
      <SortBar
        postsCount={postsCount}
        Navigate={"/postread"}
        postId="postId"
        postLikeCnt="postLikeCnt"
      />
      <PostList
        search={searchPost}
        posts={posts}
        detail={"/PostDetail"}
        __getDetail={__getPostDetail}
        getState={getState}
        __getPost={__getAddPost}
      />

      <Footer />
    </Layout2>
  );
};

export default PostRead;
