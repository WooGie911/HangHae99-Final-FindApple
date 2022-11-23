import React from "react";
import { useDispatch } from "react-redux";
import ObjectionComment from "./ObjectionComment";

const ObjectionCommentList = (props) => {
  return (
    <>
      {props.commentList &&
        props.commentList.map((comment, index) => {
          return (
            <div key={index}>
              <ObjectionComment
                comment={comment}
                __deleteComment={props.deleteComment}
              />
            </div>
          );
        })}
    </>
  );
};

export default ObjectionCommentList;
