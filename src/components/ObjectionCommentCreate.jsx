import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useInput from "../hook/useInput";

const ObjectionCommentCreate = (props) => {
  const dispatch = useDispatch();
  const initialState = { comment: "" };
  const params = useParams();
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = () => {
    const Fdata = {
      id: params.id,
      comment: { issuesComment: comments.comment },
    };
    if (comments.comment.trim() === "") {
      return alert("댓글을 입력하세요.");
    }
    if (window.confirm("작성하시겠습니까?")) {
      dispatch(props.__addComment(Fdata));
      setComments(initialState);
    }
  };
  const keyPress = (e) => {
    if (e.key === "Enter") {
      onClickAddButton();
    }
  };
  return (
    <>
      <CommentInput>
        <input
          placeholder="댓글 입력"
          value={comments.comment || ""}
          name="comment"
          type="text"
          onChange={onChangeInputHandler}
          onKeyPress={keyPress}
        />
      </CommentInput>
    </>
  );
};

export default ObjectionCommentCreate;

const CommentInput = styled.div`
  position: fixed;
  bottom: 10px;
  input {
    margin-left: 10px;
    width: 330px;
    height: 46px;
  }
`;
