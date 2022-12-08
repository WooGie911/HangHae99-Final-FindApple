import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ObjectionCommentCreate from "../../components/issues/ObjectionCommentCreate";
import ObjectionCommentList from "../../components/issues/ObjectionCommentList";
import {
  __addObjectionComment,
  __deleteObjectionComment,
  __getObjectionDetail,
} from "../../redux/modules/ObjectionDetailsSlice";
import backArrow from "../../assets/backArrow.svg";
import Layout2 from "../../components/commons/Layout2";

const ObjectionComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.objectionDetails);

  useEffect(() => {
    dispatch(__getObjectionDetail(post.issuesId));
  }, [post.updateComment]);

  const onClickHandler = () => {
    navigate(`/objectionDetail/${post.issuesId}`);
  };
  return (
    <Layout2>
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9 ">
        <img
          className="h-6 w-6 absolute left-3 "
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>댓글</div>
      </div>

      <ObjectionCommentList
        List={post}
        deleteComment={__deleteObjectionComment}
        commentList={post.comments}
        __getDetail={__getObjectionDetail}
      />
      <ObjectionCommentCreate
        __addComment={__addObjectionComment}
        __getDetail={__getObjectionDetail}
      />
    </Layout2>
  );
};

export default ObjectionComment;
