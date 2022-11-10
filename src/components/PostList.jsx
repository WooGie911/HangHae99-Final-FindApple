import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost, __getPost } from "../redux/modules/PostsSlice";

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const onDeleteHandler = (id) => {
    dispatch(__deletePost(id));
  };

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);
  return (
    <>
      <div>
        {posts &&
          posts.map((item) => {
            return (
              <div>
                <div>{item.image}</div>
                <div>{item.title}</div>
                <div>{item.content}</div>
                <button
                  type="submit"
                  onClick={() => {
                    onDeleteHandler(item.id);
                  }}
                />
              </div>
            );
          })}
        ;
      </div>
    </>
  );
};

export default PostList;
