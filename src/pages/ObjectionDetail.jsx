import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import { __deleteObjection } from "../redux/modules/ObjectionsSlice";
import {
  __addObjectionComment,
  __deleteObjectionComment,
} from "../redux/modules/ObjectionDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

const ObjectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.Objections);
  console.log(post);
  //게시글 삭제
  const onDeleteHandler = (payload) => {
    dispatch(__deleteObjection(payload));
    window.location.replace("/objectionread/all");
  };

  return (
    <>
      <Layout>
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

          <button onClick={() => navigate(`/objectionComment/${params.id}`)}>
            댓글
          </button>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default ObjectionDetail;
