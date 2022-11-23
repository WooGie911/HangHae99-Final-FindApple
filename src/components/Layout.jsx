import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  max-width: 375px;
  min-width: 375px;
  width: 375px;
  max-height: 100%;
  min-height: 100vh;
  height: 812px;
  margin: 0 auto;
  background: #f6f7fb;
`;
