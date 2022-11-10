import React from "react";
import { useDispatch } from "react-redux";
import { __addPostComment } from "../redux/modules/commentSlice";
import useInput from "../hooks/useInput";

const CommentCreate = () => {
  const contentId = useParams();
  const dispatch = useDispatch();

  const initialState = { comment: "" };
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  // 댓글 작성
  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    const obj = {
      id: contentId.id,
      comment,
    };
    if (comment.comment.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__insertComment(obj));
    setComment({
      comment: "",
    });
    // window.location.replace(`/detail/${Id}`)
  };

  // 댓글 삭제 버튼
  const onDeleteButton = (id) => {
    dispatch(__deleteComment(id));
  };

  return <div>CommentCreate</div>;
};
export default CommentCreate;
