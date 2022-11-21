import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import useInput from "../hook/useInput";

const ObjectionCommentCreate = (props) => {
  const dispatch = useDispatch();
  const initialState = { comment: "" };
  const params = useParams();
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = (e) => {
    e.preventDefault();
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
  return (
    <>
      <div>CommentCreate</div>

      <div>
        <input
          placeholder="댓글 달기..."
          value={comments.comment || ""}
          name="comment"
          type="text"
          onChange={onChangeInputHandler}
        />

        <button onClick={onClickAddButton}>등록</button>
      </div>
    </>
  );
};

export default ObjectionCommentCreate;
