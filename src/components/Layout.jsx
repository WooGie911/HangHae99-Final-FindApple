import React from 'react'
import styled from "styled-components";


const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};


export default Layout

const StLayout = styled.div`
  max-width: 375px;
  max-height: 100vh;
  height : 100%;
  overflow: auto;
  padding : 10px;
  background-color: aqua;
  /* padding : 0px 20px; */
`;