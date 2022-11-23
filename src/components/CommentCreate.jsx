import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useInput from "../hook/useInput";

const CommentCreate = (props) => {
  const dispatch = useDispatch();
  const initialState = { comment: "" };
  const params = useParams();
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = (e) => {
    e.preventDefault();
    const Fdata = {
      id: params.id,
      comment: { comment: comments.comment },
    };
    if (comments.comment.trim() === "") {
      return alert("댓글을 입력하세요.");
    }
    if (window.confirm("작성하시겠습니까?")) {
      dispatch(props.__addComment(Fdata));
      setComments(initialState);
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
        />

        <button onClick={onClickAddButton}>등록</button>
      </CommentInput>
    </>
  );
};

export default CommentCreate;

const CommentInput = styled.div`
  position: fixed;
  bottom: 10px;
  input {
    margin-left: 10px;
    width: 288px;
    height: 46px;
  }
  button {
    background-color: #3d6af2;
    color: white;
    border: none;
    width: 50px;
    height: 46px;
    margin-left: 15px;
  }
`;
