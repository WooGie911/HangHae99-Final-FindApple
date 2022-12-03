import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ObjectionCommentCreate from "../../components/issues/ObjectionCommentCreate";
import ObjectionCommentList from "../../components/issues/ObjectionCommentList";
import {
  __addObjectionComment,
  __deleteObjectionComment,
  __getObjectionDetail,
} from "../../redux/modules/ObjectionDetailsSlice";
import back from "../../assets/back.png";
import Layout from "../../components/commons/Layout";

const ObjectionComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.objectionDetails);
  console.log("이슈댓글 뭐들어오나", post);

  useEffect(() => {
    dispatch(__getObjectionDetail(post.issuesId));
  }, [post.updateComment]);

  const onClickHandler = () => {
    navigate(`/objectionDetail/${post.issuesId}`);
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
      </Layout>
    </>
  );
};

export default ObjectionComment;
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
