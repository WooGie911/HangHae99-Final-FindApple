import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import { __deleteObjection } from "../redux/modules/ObjectionsSlice";
import {
  __addObjectionComment,
  __deleteObjectionComment,
} from "../redux/modules/ObjectionDetailsSlice";

const ObjectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.Objections.post);

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    dispatch(__deleteObjection(payload));
    navigate("-1");
    // window.location.replace("/Main");
  };

  return (
    <>
      <Header />
      <div>ObjectionDetail</div>

      <div>
        <div>post.title</div>

        {post.images !== undefined &&
          post.images.map((item) => {
            return <img src={item.image} key={item.imageId} />;
          })}
        <div>post.expectPrice</div>
        <div>post.userPrice</div>
        <div>post.content</div>
      </div>

      <CommentList
        __deleteComment={__deleteObjectionComment}
        commentList={post.commentList}
      />
      <CommentCreate __addComment={__addObjectionComment} />

      <div>
        <button onClick={() => navigate("-1")}>이전으로</button>
        <button
          onClick={() => {
            onDeleteHandler(post.postId);
          }}
        >
          글삭제
        </button>
      </div>
    </>
  );
};

export default ObjectionDetail;
