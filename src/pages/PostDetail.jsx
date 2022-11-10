import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import { __deletePost, __CartPost } from "../redux/modules/PostsSlice";
import {
  __addPostComment,
  __deletePostComment,
} from "../redux/modules/PostDetailsSlice";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.details.post);
  const commentList = useSelector((state) => state.comment.post.commentList);

  //찜하기
  const onCartButton = (payload) => {
    dispatch(__CartPost(payload));
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    dispatch(__deletePost(payload));
    navigate("-1");
    // window.location.replace("/Main");
  };

  return (
    <>
      <Header />
      <div>PostDetail</div>
      <button onClick={onCartButton(post.postId)}>찜</button>
      <button onClick={() => navigate("/postupdate")}> 수정하기</button>
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
        __deleteComment={__deletePostComment}
        commentList={commentList}
      />
      <CommentCreate __addComment={__addPostComment} />

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

export default PostDetail;
