import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Header = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  //카테고리별 이동 및 get 을 위한 state 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    props.setState({
      ...props.state,
      paramObj: paramObj,
      postSort: params.sort,
    });
    navigate(`${props.Navigate}/${data}/${params.sort}`);
  };

  return (
    <div>
      <HeaderSpace>
        <div
          onClick={() => {
            onClickCategoryHandler("all");
          }}
        >
          {" "}
          제품 전체보기
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
      </HeaderSpace>
    </div>
  );
};

export default Header;

const HeaderSpace = styled.div`
  cursor: pointer;
  background-color: beige;
  display: flex;
  div {
    margin-right: 15px;
  }
`;
