import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPostDetail } from "../redux/modules/PostDetailsSlice";
import { __getPost } from "../redux/modules/PostsSlice";

const MainList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HeaderState = {
    paramObj: "all",
    pageNumber: 0,
    pageSize: 5,
    postSort: "postLikeCnt",
  };
  const [submitOBJ, setSubmitOBJ] = useState(HeaderState);
  const { posts } = useSelector((state) => state.posts);

  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    setSubmitOBJ({ ...submitOBJ, paramObj: paramObj });
  };

  const onClickHandler = (data) => {
    dispatch(__getPostDetail(data));
    navigate(`/PostDetail/${data}`);
  };

  useEffect(() => {
    dispatch(__getPost(submitOBJ));
  }, [submitOBJ]);

  return (
    <>
      <div>
        <div
          onClick={() => {
            onClickCategoryHandler("all");
          }}
        >
          전체
        </div>
        <div
          onClick={() => {
            onClickCategoryHandler("macbook");
          }}
        >
          MacBook
        </div>
        <div
          onClick={() => {
            onClickCategoryHandler("iphone");
          }}
        >
          iPhone
        </div>
      </div>
      <div>
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    onClickHandler(post.postId);
                  }}
                >
                  <PList>
                    <div>
                      {post.images && <img src={post.images[0].imgUrl} />}
                    </div>
                    <br />
                    <div>
                      <label>title : {post.title}</label>
                      <br />
                      <label>category : {post.category}</label>
                      <br />
                      <label>userPrice : {post.userPrice}</label>
                    </div>
                  </PList>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MainList;

const PList = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  display: flex;
  padding: 15px;
  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
    border: 1px solid transparent;
  }
`;
