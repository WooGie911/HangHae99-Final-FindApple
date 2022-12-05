import React from "react";
import Comment from "../commons/Comment";

const ObjectionCommentList = (props) => {
  return (
    <div className="pt-5">
      {props.commentList &&
        props.commentList.map((comment, index) => {
          return (
            <div key={index}>
              <Comment
                comment={comment}
                __deleteComment={props.deleteComment}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ObjectionCommentList;
