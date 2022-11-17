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
  background-color: beige;
  display: flex;
  div {
    margin-right: 15px;
  }
`;
