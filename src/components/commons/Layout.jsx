import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-[375px] relative flex-col mx-auto h-[100vh] bg-BGC overflow-x-hidden scrollbar-hide">
      {children}
    </div>
  );
};

export default Layout;
