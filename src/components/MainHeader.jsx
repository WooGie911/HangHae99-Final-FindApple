import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { initialHeaderState } from "../redux/modules/PostsSlice";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //카테고리별 이동 및 get 을 위한 store 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    const initialObj = {
      paramObj: paramObj,
      pageNumber: 0,
      pageSize: 10,
      postSort: "postId",
    };
    dispatch(initialHeaderState(initialObj));
    navigate(`${props.Navigate}/${data}/postId`);
  };

  return (
    <div>
      <HeaderSpace>
        <HeaderTextSpace>
          <span
            onClick={() => {
              navigate("/main");
            }}
          >
            HOME
          </span>
          <div
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </div>
          <div
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </div>
          <div
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </div>
        </HeaderTextSpace>
        <HeaderBottomBar>
          <span />
          <div />
          <div />
          <div />
        </HeaderBottomBar>
      </HeaderSpace>
    </div>
  );
};

export default MainHeader;

const HeaderSpace = styled.div`
  cursor: pointer;
  background-color: #3d6af2;
  color: #ffffff;
  height: 49px;
`;
const HeaderTextSpace = styled.div`
  font-size: 14px;
  display: flex;
  height: 45px;
  justify-content: space-between;

  span {
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
    width: 25%;
    justify-content: center;
  }

  div {
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
    width: 25%;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const HeaderBottomBar = styled.div`
  display: flex;
  height: 4px;
  span {
    height: 100%;
    width: 25%;
    background-color: rgba(255, 255, 255, 0.5);
  }
  div {
    height: 100%;
    width: 25%;
  }
`;