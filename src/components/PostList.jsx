import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";

const PostList = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(__getPost);
  // }, []);
  return (
    <>
      <div>PostList컴포넌트</div>
      {props.posts &&
        props.posts.map((post, index) => {
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
