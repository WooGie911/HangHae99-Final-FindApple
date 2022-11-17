import React from "react";
import { useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import {
  __addObjectionComment,
  __deleteObjectionComment,
} from "../redux/modules/ObjectionDetailsSlice";

const ObjectionComment = () => {
  const { post } = useSelector((state) => state.objectionDetails);
  return (
    <>
      <div>ObjectionComment</div>

      <CommentList
        __deleteComment={__deleteObjectionComment}
        commentList={post.comments}
      />
      <CommentCreate __addComment={__addObjectionComment} />
    </>
  );
};

export default ObjectionComment;
