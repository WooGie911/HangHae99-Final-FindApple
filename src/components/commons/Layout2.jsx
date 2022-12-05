import React from "react";

const Layout2 = ({ children }) => {
  return (
    <div className="w-[375px] relative flex-col mx-auto min-h-[100vh] h-full bg-white">
      {children}
    </div>
  );
};

export default Layout2;
