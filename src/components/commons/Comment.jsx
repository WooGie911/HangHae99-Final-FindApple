import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toggle from "../../assets/toggle.svg";

const Comment = ({ comment, __deleteComment }) => {
  const dispatch = useDispatch();
  const onDeleteButton = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteComment(payload));
    }
  };

  const [editTg, setEidtTg] = useState({
    isEdit: false,
  });
  const editToggleHandler = () => {
    const newEdit = {
      isEdit: !editTg.isEdit,
    };
    setEidtTg(newEdit);
  };
  return (
    <div className=" flex items-center h-20 px-[18px] ">
      <div className=" flex  w-full items-center justify-between ">
        <div className="flex items-center">
          <div className=" p-3">
            <img
              className="w-[38px] h-[38px] rounded-full"
              src={comment.avatarUrl}
            />
          </div>
          <div className="flex-col text-[14px] font-semibold">
            <div>{comment.nickname} </div>
            <div className="ml-1 text-[13px] font-medium">
              {" "}
              {comment.comment}
            </div>
          </div>
        </div>
        <div className=" relative flex-col  ">
          <div className=" flex justify-end">
            {comment.myComment === true && (
              <img src={toggle} onClick={editToggleHandler} />
            )}
          </div>
          <div>
            {editTg.isEdit === true && (
              <button
                className="text-red h-5 w-7  relative right-0 bottom-0 text-xs"
                onClick={() => onDeleteButton(comment.commentId)}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
