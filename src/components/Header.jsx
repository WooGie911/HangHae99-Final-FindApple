import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderSpace>
      <div
        onClick={() => {
          navigate("/");
        }}
      >        홈
      </div>
      <div
        onClick={() => {
          navigate("/postread/macbook");
        }}
      >
        
        MacBook
      </div>
      <div
        onClick={() => {
          navigate("/postread/iphone");
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
div{
  margin-right : 15px;
}
`