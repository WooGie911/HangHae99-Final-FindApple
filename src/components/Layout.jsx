import React from 'react'
import styled from "styled-components";


const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};


export default Layout

const StLayout = styled.div`
  width: 375px;
  height: 100vh;
  margin: 0 auto;
  background-color: aqua;
  padding : 0px 20px;
`;