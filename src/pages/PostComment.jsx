import React from "react";
import { useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import {
  __addPostComment,
  __deletePostComment,
} from "../redux/modules/PostDetailsSlice";

const PostComment = () => {
  const { post } = useSelector((state) => state.details);
  return (
    <>
      <div>PostComment</div>

      <CommentList
        __deleteComment={__deletePostComment}
        commentList={post.comments}
      />
      <CommentCreate __addComment={__addPostComment} />
    </>
  );
};

export default PostComment;
