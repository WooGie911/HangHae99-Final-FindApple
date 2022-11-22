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
  min-height: 1171px;
  height: 100%;
  margin: auto;
  padding-bottom: 60px;
  background: #f6f7fb;
`;
