import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderSpace>
        <div
          onClick={() => {
            navigate(`${props.Navigate}/all`);
          }}
        >
          {" "}
          제품 전체보기
        </div>
        <div
          onClick={() => {
            navigate(`${props.Navigate}/macbook`);
          }}
        >
          MacBook
        </div>
        <div
          onClick={() => {
            navigate(`${props.Navigate}/iphone`);
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
  background-color: black;
  color : #FFFFFF;
  font-size : 14px;
  display: flex;
  height: 49px;
  justify-content: space-between;
  line-height : 49px;
  padding : 0 20px;
  div {
    margin-right: 15px;
  }
`;
