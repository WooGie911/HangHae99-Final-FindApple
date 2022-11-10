import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(__getPost);
  }, []);
  return (
    <>
      <div>PostList</div>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <div>
                  <img
                    src={post.imgs}
                    style={{
                      marginTop: "-20px",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                  <text className="like">
                    ❤️{post.likeSize} - 💭{post.commentSize}
                  </text>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PostList;
