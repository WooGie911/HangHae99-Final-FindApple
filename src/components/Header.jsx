import React, { useState } from "react";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(true);
  };

  return (
    <div>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </h1>
      <Span
        onClick={() => {
          navigate("/postread");
        }}
      >
        MacBook
      </Span>
      <Span
        onClick={() => {
          navigate("/postread");
        }}
      >
        iPhone
      </Span>
      <button
        onClick={() => {
          navigate("/signin");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigate("/mypage");
        }}
      >
        마이페이지
      </button>
      <button onClick={handleModal}>모달켜기</button>
      {modalOn && <Modal setModalOn={setModalOn} />}
    </div>
  );
};

export default Header;

const Span = styled.span`
  cursor: pointer;
`;
