import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import {
  __addPostComment,
  __deletePostComment,
  __getPostDetail,
} from "../redux/modules/PostDetailsSlice";

const PostComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(__getPostDetail(post.postId));
  }, [post.updateComment]);

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        X
      </button>
      <div>PostComment</div>

      <CommentList
        List={post}
        __deleteComment={__deletePostComment}
        commentList={post.comments}
        __getDetail={__getPostDetail}
      />
      <CommentCreate
        __addComment={__addPostComment}
        __getDetail={__getPostDetail}
      />
    </>
  );
};

export default PostComment;
