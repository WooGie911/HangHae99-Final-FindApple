import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import {
  __addPostComment,
  __deletePostComment,
  __getPostDetail,
} from "../redux/modules/PostDetailsSlice";
import back from "../assets/back.png";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const PostComment = () => {
  const { id } = useParams();
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
    <>
      <Layout>
        <HeadContainer>
          <div>
            <img
              onClick={onClickHandler}
              style={{ width: 25, height: 25 }}
              src={back}
            />
            <span>댓글</span>
          </div>
        </HeadContainer>
        <hr />
        <CommentList
          __deleteComment={__deletePostComment}
          commentList={post.comments}
        />
        <CommentCreate
          __addComment={__addPostComment}
          __getDetail={__getPostDetail}
        />
      </Layout>
    </>
  );
};

export default PostComment;
const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;
  img {
    float: left;
    margin-right: 130px;
  }
  span {
    /* text-align: center; */
    font-size: 24px;
    font-weight: bold;
  }
`;
