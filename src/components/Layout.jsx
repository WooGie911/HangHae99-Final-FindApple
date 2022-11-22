import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  max-width: 375px;
  min-width: 375px;
  max-height: 100vh;
  min-height: 100vh;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: aqua;
  margin: auto;
`;
