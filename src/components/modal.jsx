import React, { useState } from "react";
import styled from "styled-components";
import PricingInput from "./PricingInput";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  // 토글
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  // 토글 핸들러
  const toggleBtnHandle = () => {
    setToggle(!toggle);
  };

  const handleModal = () => {
    props.setModalOn(false);
  };

  return (
    <Background>
      <Content>
        <button onClick={handleModal}>모달끄기</button>
        <button
          onClick={() => {
            navigate("/postcreate");
          }}
        >
          상품등록
        </button>
        <button
          onClick={() => {
            navigate("/objectioncreate");
          }}
        >
          이의제기
        </button>
        <PricingInput />
      </Content>
    </Background>
  );
};

export default Modal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  height: 510px;
  width: 606px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  top: 25%;
  left: 100%;
  overflow: none;
  background: gray;
  box-shadow: 0px 4px 8px #eee;
  z-index: 999;
`;
