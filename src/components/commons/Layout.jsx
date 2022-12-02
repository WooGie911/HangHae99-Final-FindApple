import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-[375px] relative flex-col mx-auto min-h-[100vh] h-full bg-BC">
      {children}
    </div>
  );
};

export default Layout;
