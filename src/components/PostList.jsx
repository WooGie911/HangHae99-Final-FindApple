import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, detail, __getDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = (data) => {
    dispatch(__getDetail(data));
    navigate(`${detail}/${data}`);
  };
  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  onClickHandler(post.postId);
                }}
              >
                {/* <div>
                  {post.images &&
                    post.images.map((item) => {
                      return (
                        <img
                          key={item.id}
                          src={item.imgUrl}
                          style={{
                            marginTop: "-20px",
                            width: "300px",
                            height: "300px",
                          }}
                        />
                      );
                    })}
                </div> */}
                <br />
                <div>{post.images && <img src={post.images[0].imgUrl} />}</div>
                <br />
                <div>
                  <label>title : {post.title}</label>
                  <br />
                  <label>category : {post.category}</label>
                  <br />
                  <label>userPrice : {post.userPrice}</label>
                  <br />
                  <br />
                  {/* 크리에이트앳 받아서 수정, 카테고리 대신 기종*/}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PostList;
