import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
const CommentList = (props) => {
  return (
    <>
      {props.commentList &&
        props.commentList.map((comment, index) => {
          return (
            <div key={index}>
              <Comment
                comment={comment}
                __deleteComment={props.__deleteComment}
              />
            </div>
          );
        })}
    </>
  );
};

export default CommentList;
