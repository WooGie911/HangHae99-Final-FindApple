import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, detail, __getDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("posts 데이터", posts);
  const onClickHandler = (data) => {
    dispatch(__getDetail(data));
    navigate(`/${detail}/${data}`);
  };
  return (
    <>
      <div>PostList컴포넌트</div>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  onClickHandler(post.postId);
                }}
              >
                <div>
                  <img
                    src={post.images}
                    style={{
                      marginTop: "-20px",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                </div>
                <br />
                <div>
                  <label>nickname : {post.nickname}</label>
                  <br />
                  <label>제목 : {post.title}</label>
                  <br />
                  <label>예상가격 : {post.expectPrice}</label>
                  <br />
                  <label>판매 가격 : {post.userPrice}</label>
                  <br />
                  <label>내용 : {post.content}</label>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PostList;
