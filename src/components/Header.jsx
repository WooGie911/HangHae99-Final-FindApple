import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Header = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [headerBarState, setHeaderBarState] = useState("all");
  //카테고리별 이동 및 get 을 위한 state 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    props.setState({
      ...props.state,
      paramObj: paramObj,
      postSort: params.sort,
    });
    setHeaderBarState(data);
    navigate(`${props.Navigate}/${data}/${params.sort}`);
  };

  return (
    <div>
      <HeaderSpace>
        <HeaderTextSpace>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </div>

          {headerBarState === "all" ? (
            <span
              onClick={() => {
                onClickCategoryHandler("all");
              }}
            >
              전체
            </span>
          ) : (
            <div
              onClick={() => {
                onClickCategoryHandler("all");
              }}
            >
              전체
            </div>
          )}
          {headerBarState === "macbook" ? (
            <span
              onClick={() => {
                onClickCategoryHandler("macbook");
              }}
            >
              MacBook
            </span>
          ) : (
            <div
              onClick={() => {
                onClickCategoryHandler("macbook");
              }}
            >
              MacBook
            </div>
          )}
          {headerBarState === "iphone" ? (
            <span
              onClick={() => {
                onClickCategoryHandler("iphone");
              }}
            >
              iPhone
            </span>
          ) : (
            <div
              onClick={() => {
                onClickCategoryHandler("iphone");
              }}
            >
              iPhone
            </div>
          )}
        </HeaderTextSpace>

        {headerBarState === "all" ? (
          <HeaderBottomBar>
            <div />
            <span />
            <div />
            <div />
          </HeaderBottomBar>
        ) : headerBarState === "macbook" ? (
          <HeaderBottomBar>
            <div />
            <div />
            <span />
            <div />
          </HeaderBottomBar>
        ) : headerBarState === "iphone" ? (
          <HeaderBottomBar>
            <div />
            <div />
            <div />
            <span />
          </HeaderBottomBar>
        ) : (
          <HeaderBottomBar>
            <span />
            <div />
            <div />
            <div />
          </HeaderBottomBar>
        )}
      </HeaderSpace>
    </div>
  );
};

export default Header;

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
