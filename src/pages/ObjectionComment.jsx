import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import ObjectionCommentCreate from "../components/ObjectionCommentCreate";
import ObjectionCommentList from "../components/ObjectionCommentList";
import {
  __addObjectionComment,
  __deleteObjectionComment,
  __getObjectionDetail,
} from "../redux/modules/ObjectionDetailsSlice";

const ObjectionComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.objectionDetails);
  console.log("이슈댓글 뭐들어오나", post);

  useEffect(() => {
    dispatch(__getObjectionDetail(post.issuesId));
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
      <div>ObjectionComment</div>

      <ObjectionCommentList
        List={post}
        __deleteComment={__deleteObjectionComment}
        commentList={post.comments}
        __getDetail={__getObjectionDetail}
      />
      <ObjectionCommentCreate
        __addComment={__addObjectionComment}
        __getDetail={__getObjectionDetail}
      />
    </>
  );
};

export default ObjectionComment;
