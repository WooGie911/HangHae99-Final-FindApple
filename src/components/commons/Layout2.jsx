import React from "react";

const Layout2 = ({ children }) => {
  return (
    <div className="w-full max-w-[375px] relative flex-col mx-auto h-[100vh] bg-white overflow-x-hidden  scrollbar-hide shadow-2xl">
      {children}
    </div>
  );
};

export default Layout2;
