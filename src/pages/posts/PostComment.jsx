import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentCreate from "../../components/posts/CommentCreate";
import CommentList from "../../components/posts/CommentList";
import {
  __addPostComment,
  __deletePostComment,
  __getPostDetail,
} from "../../redux/modules/PostDetailsSlice";
import Layout2 from "../../components/commons/Layout2";
import backArrow from "../../assets/backArrow.svg";

const PostComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(__getPostDetail(post.postId));
  }, [post.updateComment]);
  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <Layout2>
      <div className=" fixed top-0 flex w-full max-w-[375px] bg-white ">
        <div className="w-full flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9 ">
          <img
            className="h-6 w-6 absolute left-3"
            onClick={onClickHandler}
            src={backArrow}
          />
          <div>댓글</div>
        </div>
      </div>
      <div className="h-9"></div>
      <CommentList
        __deleteComment={__deletePostComment}
        commentList={post.comments}
        post={post}
      />
      <CommentCreate
        __addComment={__addPostComment}
        __getDetail={__getPostDetail}
      />
    </Layout2>
  );
};

export default PostComment;
