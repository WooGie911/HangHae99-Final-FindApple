import React from "react";
import Header from "../components/Header";

import { useNavigate, useParams } from "react-router-dom";
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
  const params = useParams();
  const { posts } = useSelector((state) => state.details);
  // const { comments } = useSelector((state) => state.details.posts);

  //찜하기
  const onCartButton = (payload) => {
    dispatch(__CartPost(payload));
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    dispatch(__deletePost(payload));
    navigate("/postread/all");
  };

  return (
    <>
      <Header />
      <div>PostDetail</div>
      <button onClick={() => onCartButton(posts.postId)}>찜</button>
      <button onClick={() => navigate(`/postupdate/${posts.postId}`)}>
        수정하기
      </button>
      <div>
        <div>{posts.title}</div>
        {posts.images !== undefined &&
          posts.images.map((item, index) => {
            return <img src={item.image} key={index} />;
          })}
        <div>{posts.expectPrice}</div>
        <div>{posts.userPrice}</div>
        <div>{posts.content}</div>
      </div>

      <CommentList
        __deleteComment={__deletePostComment}
        commentList={posts.comments}
      />
      <CommentCreate __addComment={__addPostComment} />

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

export default PostDetail;
