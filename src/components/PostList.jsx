import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
//원규--
import React, { useState, useEffect, useCallback } from "react";
import { __postList } from "../redux/modules/PostsSlice";
import { useInView } from "react-intersection-observer";

const PostList = ({ posts, detail, __getDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = (data) => {
    dispatch(__getDetail(data));
    navigate(`${detail}/${data}`);
  };

  //원규 무한스크롤
  const { posts_state, isLoading } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ref, inView] = useInView();

  /**  서버에서 아이템을 가지고 오는 함수 */
  const getItems = useCallback(async () => {
    dispatch(__postList(page));
  }, [dispatch, page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
    setTotal(posts_state.length);
    console.log("total", total);
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 마지막이 아니면 페이지+1
    if (inView && !isLoading && total !== posts_state.length) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLoading, total]);

  useEffect(() => {
    console.log("posts", posts_state);
  }, [posts_state]);

  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  onClickHandler(post.postId);
                }}
              >
                <br />
                <div>{post.images && <img src={post.images[0].imgUrl} />}</div>
                <br />
                <div>
                  <label>title : {post.title}</label>
                  <br />
                  <label>category : {post.category}</label>
                  <br />
                  <label>userPrice : {post.userPrice}</label>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      <div ref={ref}></div>
    </>
  );
};

export default PostList;
