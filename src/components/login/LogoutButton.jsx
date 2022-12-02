import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogout from "./KakaoLogout";

const LogoutButton = () => {
  const navigate = useNavigate();

  const SiteType = window.localStorage.getItem("SITE");
  const onClickButton = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      navigate("/signin");
    }
  };

  return (
    <>
      {SiteType === "KAKAO" ? (
        <KakaoLogout />
      ) : (
        <button
          className="w-[70px] h-[25px] border-CC border-[1px] rounded text-[11px] font-medium text-CC"
          onClick={onClickButton}
        >
          로그아웃
        </button>
      )}
    </>
  );
};

export default LogoutButton;
