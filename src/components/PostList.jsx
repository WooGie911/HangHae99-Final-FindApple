import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, detail, __getDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = (data) => {
    dispatch(__getDetail(data));
    navigate(`${detail}/${data}`);
  };
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
    </>
  );
};

export default PostList;
