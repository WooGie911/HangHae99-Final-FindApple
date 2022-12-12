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
import Layout2 from "../../components/commons/Layout2";
import backArrow from "../../assets/pictures/backArrow.svg";

const ObjectionComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.objectionDetails);

  useEffect(() => {
    dispatch(__getObjectionDetail(post.issuesId));
  }, [post.updateComment]);

  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <Layout2>
      <div className=" fixed top-0 flex w-full max-w-[375px] bg-white ">
        <div className="w-full flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9 ">
          <img
            className="h-6 w-6 absolute left-3 "
            onClick={onClickHandler}
            src={backArrow}
          />
          <div>댓글</div>
        </div>
      </div>
      <div className="h-9"></div>
      <ObjectionCommentList
        post={post}
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
