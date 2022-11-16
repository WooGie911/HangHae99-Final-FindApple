import React from "react";

const KakaoLogin = () => {
  const REST_API_KEY = "d2c795c61c767b9c2bc94eb5cb045230";
  const REDIRECT_URI = "http://localhost:3000/KAKAO";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <a id="kakao-login-btn" onClick={handleLogin}>
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="200"
          alt="카카오 로그인 버튼"
        />
      </a>
      <p id="token-result"></p>
    </div>
  );
};

export default KakaoLogin;
