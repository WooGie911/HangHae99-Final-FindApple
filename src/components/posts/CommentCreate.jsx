import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useInput from "../../hook/useInput";
import commentSubmit from "../../assets/commentSubmit.png";

const CommentCreate = (props) => {
  const dispatch = useDispatch();
  const initialState = { comment: "" };
  const params = useParams();
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = () => {
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
  const keyPress = (e) => {
    if (e.key === "Enter") {
      onClickAddButton();
    }
  };

  return (
    <div className="w-[375px] fixed bottom-0">
      <div className="flex absolute  bottom-0 w-full py-3 px-[18px]">
        <input
          className="  h-[38px] w-full rounded-3xl px-3 text-[14px] text-C4 border-DD border-[1px]"
          placeholder="댓글을 입력하세요"
          value={comments.comment || ""}
          name="comment"
          type="text"
          onChange={onChangeInputHandler}
          onKeyPress={keyPress}
        />
        <img
          className=" absolute right-9 bottom-[22px]"
          src={commentSubmit}
          onClick={() => {
            onClickAddButton();
          }}
        />
      </div>
    </div>
  );
};

export default CommentCreate;
