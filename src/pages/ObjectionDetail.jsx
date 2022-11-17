import React from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
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
  const params = useParams();
  const { post } = useSelector((state) => state.Objections);

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    dispatch(__deleteObjection(payload));
    window.location.replace("/objectionread/all");
  };

  return (
    <>
      <Header />
      <div>ObjectionDetail</div>

      <button onClick={() => navigate(`/objectionupdate/${params.id}`)}>
        수정하기
      </button>

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
        <button onClick={() => navigate(-1)}>이전으로</button>
        <button
          onClick={() => {
            onDeleteHandler(params.id);
          }}
        >
          글삭제
        </button>
      </div>
    </>
  );
};

export default ObjectionDetail;
