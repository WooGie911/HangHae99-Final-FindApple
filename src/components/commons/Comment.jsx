import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toggle from "../../assets/pictures/toggle.svg";

const Comment = ({ comment, __deleteComment, post }) => {
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
    console.log("post?.memberId", post?.memberId);
    console.log("comment.commentId", comment.memberId);
  };
  return (
    <div className=" flex items-center h-20 px-[18px] ">
      <div className=" flex  w-full items-center justify-between ">
        <div className="flex items-center">
          <div className=" p-3">
            <img
              className="w-[38px] h-[38px] rounded-full object-cover"
              src={comment.avatarUrl}
            />
          </div>
          <div className="flex-col text-[14px] font-semibold">
            <div className="flex items-center">
              {post?.memberId === comment.memberId && (
                <div className="flex justify-center rounded-md w-11 h-4 bg-CC bg-opacity-50 text-CC text-xs">
                  작성자
                </div>
              )}
              <div className="ml-1 text-center mb-1 ">{comment.nickname}</div>
            </div>
            <div className="ml-1 text-[13px] font-medium">
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
              <div
                className="fixed top-0 left-0 bg-black bg-opacity-50 z-20 w-full h-full flex justify-center items-center font-semibold"
                onClick={editToggleHandler}
              >
                <div className=" absolute bottom-0  z-30 w-full max-w-[375px] flex-col">
                  <div className="w-full flex py-2 px-[18px]">
                    <div
                      className="hover:bg-CC hover:text-white cursor-pointer bg-white w-full h-14 rounded-lg flex justify-center items-center"
                      onClick={() => onDeleteButton(comment.commentId)}
                    >
                      삭제
                    </div>
                  </div>
                  <div className="w-full flex py-2 px-[18px]">
                    <div
                      className="hover:bg-black hover:text-white cursor-pointer bg-white w-full h-14 mb-2 rounded-lg flex justify-center items-center"
                      onClick={editToggleHandler}
                    >
                      닫기
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
