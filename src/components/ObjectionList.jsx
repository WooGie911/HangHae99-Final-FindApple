import { useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import React from "react";
import { __getPostTime } from "../redux/modules/PostsSlice";

const ObjectionList = ({ posts, detail, __getDetail }) => {
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
                  onClickHandler(post.issuesId);
                }}
              >
                <PList>
                  <div>
                    {post.images && <img src={post.images[0].imgUrl} />}
                  </div>
                  <br />
                  <div>
                    <label>title : {post.title}</label>
                    <br />
                    <label>category : {post.category}</label>
                    <br />
                    <label>userPrice : {post.userPrice}</label>
                  </div>
                </PList>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ObjectionList;

const PList = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  display: flex;
  padding: 15px;
  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
    border: 1px solid transparent;
  }
`;
