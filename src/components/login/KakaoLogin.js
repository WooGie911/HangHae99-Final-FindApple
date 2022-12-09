import React from "react";
import { KAKAO_AUTH_URL } from "../elements/LoginKey";
import KAKAOIMG from "../../assets/kakaologin.svg";

const KakaoLogin = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <a className="cursor-pointer" id="kakao-login-btn" onClick={handleLogin}>
        <img src={KAKAOIMG} />
      </a>
      <p id="token-result"></p>
    </div>
  );
};

export default KakaoLogin;
