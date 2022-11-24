import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPostDetail } from "../redux/modules/PostDetailsSlice";
import { __getPost } from "../redux/modules/PostsSlice";

const MainList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HeaderState = {
    paramObj: "all",
    pageNumber: 0,
    pageSize: 5,
    postSort: "postLikeCnt",
  };
  const [submitOBJ, setSubmitOBJ] = useState(HeaderState);
  const [headerBarState, setHeaderBarState] = useState("all");
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);

  const onClickCategoryHandler = (data) => {
    setHeaderBarState(data);
    const paramObj = data === "all" ? data : `category/${data}`;
    setSubmitOBJ({ ...submitOBJ, paramObj: paramObj });
  };

  const onClickHandler = (data) => {
    dispatch(__getPostDetail(data));
    navigate(`/PostDetail/${data}`);
  };

  useEffect(() => {
    dispatch(__getPost(submitOBJ));
  }, [submitOBJ]);

  return (
    <>
      <Stdivwrap>
        {headerBarState === "all" ? (
          <Stbutton1
            src="https://img.icons8.com/external-regular-kawalan-studio/24/null/external-oval-shape-regular-kawalan-studio.png"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </Stbutton1>
        ) : (
          <Stbutton2
            src="https://img.icons8.com/external-regular-kawalan-studio/24/null/external-oval-shape-regular-kawalan-studio.png"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </Stbutton2>
        )}
        {headerBarState === "macbook" ? (
          <Stbutton3
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </Stbutton3>
        ) : (
          <Stbutton4
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </Stbutton4>
        )}
        {headerBarState === "iphone" ? (
          <Stbutton3
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </Stbutton3>
        ) : (
          <Stbutton4
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </Stbutton4>
        )}
      </Stdivwrap>
      <Stlistwrap>
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    onClickHandler(post.postId);
                  }}
                >
                  <PList>
                    <div>
                      {post.images && (
                        <img
                          src={post.images[0].imgUrl}
                          style={{
                            width: 97,
                            height: 97,
                            marginTop: 9,
                            marginLeft: 9,
                            borderRadius: 5,
                          }}
                        />
                      )}
                    </div>
                    <Map_listwrap>
                      <Map_listprice2>
                        <label>{post.userPrice}</label>
                      </Map_listprice2>
                      <Map_listcategory>
                        <label>{post.category}</label>
                      </Map_listcategory>
                      <Map_listlike>
                        <span>{post.createdAt}</span>
                        <span
                          style={{
                            position: "relative",
                            left: 150,
                          }}
                        >
                          ❤️{post.likeCnt}
                        </span>
                      </Map_listlike>
                    </Map_listwrap>
                  </PList>
                </div>
              </div>
            );
          })}
      </Stlistwrap>
    </>
  );
};

export default MainList;

const Stlistwrap = styled.div`
  margin-top: 20px;
`;

const PList = styled.div`
  border-width: 1.2px 0px 1.2px 0px;
  display: flex;
  padding: 4px;
  margin-left: 12px;
  margin-top: 12px;
  background-color: white;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  width: 343px;
  height: 118px;
  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
    border: 1px solid transparent;
  }
`;

const Stdivwrap = styled.div`
  display: flex;
  margin-left: 15px;
`;

const Stbutton1 = styled.button`
  border-radius: 20px;
  width: 45px;
  height: 23px;
  margin-left: 3px;
  margin-top: 30px;
  border: 2px solid #3d6af2;
  background-color: #3d6af2;
  color: white;
  cursor: pointer;
`;
const Stbutton2 = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 45px;
  height: 23px;
  margin-left: 3px;
  margin-top: 30px;
  color: #3d6af2;
  border: 2px solid #3d6af2;
  cursor: pointer;
`;
const Stbutton3 = styled.button`
  background-color: #3d6af2;
  border-radius: 20px;
  width: 86px;
  height: 23px;
  margin-left: 3px;
  margin-top: 30px;
  color: white;
  border: 2px solid #3d6af2;
  cursor: pointer;
`;
const Stbutton4 = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 86px;
  height: 23px;
  margin-left: 3px;
  margin-top: 30px;
  color: #3d6af2;
  border: 2px solid #3d6af2;
  cursor: pointer;
`;

const Map_listwrap = styled.div`
  font-style: inter;
  flex-direction: row;
`;

const Map_listprice2 = styled.div`
  margin-left: 7px;
  font-size: 16px;
  margin-top: 9px;
`;

const Map_listcategory = styled.div`
  font-size: 14px;
  margin-left: 7px;
`;

const Map_listlike = styled.span`
  margin-left: 7px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 36px;
`;
