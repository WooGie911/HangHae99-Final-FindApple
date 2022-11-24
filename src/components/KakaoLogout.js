import React from "react";
import { KAKAO_LOGOUT_URL } from "./elements/LoginKey";

const KakaoLogout = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_LOGOUT_URL;
  };
  return (
    <div>
      <button onClick={handleLogin}></button>
    </div>
  );
};

export default KakaoLogout;
