import React from "react";
import { KAKAO_LOGOUT_URL } from "../elements/LoginKey";

const KakaoLogout = () => {
  const handleLogin = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      window.location.href = KAKAO_LOGOUT_URL;
    }
  };
  return (
    <div>
      <button
        className="w-14 h-[25px] border-CC border-[1px] rounded-2xl text-[11px] font-medium text-CC"
        onClick={handleLogin}
      >
        로그아웃
      </button>
    </div>
  );
};

export default KakaoLogout;
