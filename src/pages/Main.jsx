import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __UserProfile } from "../redux/modules/LoginSlice";
import photoIMG from "../assets/photoIMG.png"


const Main = () => {
  const {user} = useSelector((state) => state.Login)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("Access_Token");
  const refreshToken = localStorage.getItem("Refresh_Token");

  const nickname = localStorage.getItem("nickname");
  const profileIMG = localStorage.getItem("profileIMG");

  const onClickButton = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);

  return (
    
    <>
      <div>Main</div>
      <br />

      <img
        src={user.profileImg == (null || undefined)  ? photoIMG : user.profileImg}
        style={{
          marginTop: "-20px",
          width: "300px",
          height: "300px",
          borderRadius: "50%"
        }}
      />

      <br />
      <div>{user.nickname}</div>
      <br />
      <div onClick={onClickButton}>로그아웃</div>

      <div
        onClick={() => {
          navigate("/postread/macbook");
        }}
      >
        MacBook
      </div>
      <div
        onClick={() => {
          navigate("/postread/iphone");
        }}
      >
        iPhone
      </div>
      <br />
      <div>앱소개 또는 배너</div>
      <br />
      <div>
        <div>회원님을 위한 추천상품!</div>

        <div>추천상품 리스트업</div>
      </div>
      <br />
      <div
        onClick={() => {
          navigate("/postread/all");
        }}
      >
        검색
      </div>

      <div
        onClick={() => {
          navigate("/objectionread/all");
        }}
      >
        이의제기
      </div>

      <div
        onClick={() => {
          navigate("/mypage");
        }}
      >
        마이페이지
      </div>
    </>
  );
};

export default Main;
