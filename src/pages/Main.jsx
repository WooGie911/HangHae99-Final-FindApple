import React from "react";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (

    <>
      <div>Main</div>
      <br />
      <div
        onClick={() => {
          navigate("/postread/All");
        }}
      >
        전체보기
      </div>
      <div
        onClick={() => {
          navigate("/postread/MacBook");
        }}
      >
        MacBook
      </div>
      <div
        onClick={() => {
          navigate("/postread/iPhone");
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
    </>

  );
};

export default Main;
