import React from "react";
import Loading from "./Loading";

const RedirectLogout = () => {
  localStorage.clear();
  alert("로그아웃 되었습니다.");
  window.location.replace("/signin");
  return <Loading />;
};

export default RedirectLogout;
