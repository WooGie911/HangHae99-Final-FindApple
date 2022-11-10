import React from "react";
import { useDispatch } from "react-redux";

import useInput from "../hook/useInput";

const CommentCreate = (props) => {
  const dispatch = useDispatch();
  const initialState = { comment: "" };
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = (e) => {
    e.preventDefault();
    const Fdata = {
      id: props.postId,
      comment: { comment: comments.comment },
    };
    if (comments.comment.trim() === "") {
      return alert("댓글을 입력하세요.");
    }
    dispatch(props.__addComment(Fdata));
    setComments(initialState);
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


export default CommentCreate;
