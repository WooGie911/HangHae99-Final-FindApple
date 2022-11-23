import { useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import React from "react";
import { __getPostTime } from "../redux/modules/PostsSlice";

const ObjectionList = ({ posts, detail, __getDetail }) => {
  console.log(posts);
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
                    <label>{post.title}</label>
                    <br />
                    <label>{post.userPrice}원</label>
                    <br />
                    <label>{post.category}</label>
                    <HeartCreatedAt>
                      <div>{post.createdAt}</div>
                      <div>
                        {" "}
                        <img
                          src="https://img.icons8.com/ios-glyphs/15/null/hearts.png"
                          style={{ width: "10px", height: "10px" }}
                        />
                        {post.likeCnt}
                      </div>
                    </HeartCreatedAt>
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

// 리스트 하트와 시간
const HeartCreatedAt = styled.div`
  width: 290px;
  display: flex;
  justify-content: space-between;
`;
