import React from "react";
import Loading from "./Loading";

const RedirectLogout = () => {
  localStorage.clear();
  window.location.replace("/signin");
  return <Loading />;
};

export default RedirectLogout;
