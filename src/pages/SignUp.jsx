import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __SignUp, __emailCheck } from "../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import useInput from "../hook/useInput";
import Layout from "../components/Layout";
import back from "../assets/back.png";
import LOGO from "../assets/LOGO.svg";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailCheckTF, setEmailCheckTF] = useState(false);
  const initialstate = {
    email: "",
    emailCheck: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  };

  //커스텀훅 useInput 사용
  const [input, setInput, changeInputHandler] = useInput(initialstate);
  const emailCheckData = localStorage.getItem("emailCheckData");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (
      input.email === "" ||
      input.nickname === "" ||
      input.password === "" ||
      input.passwordCheck === ""
    ) {
      return alert("입력을 확인하세요.");
    }
    if (emailCheckTF === true) {
      if (input.emailCheck !== emailCheckData) {
        return alert("인증번호가 일치하지 않습니다.");
      }
    }
    if (input.password !== input.passwordCheck) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    const AAA = {
      email: input.email,
      nickname: input.nickname,
      password: input.password,
    };

    if (window.confirm("가입하시겠습니까?")) {
      dispatch(__SignUp(AAA));
      setInput(initialstate);
    }
  };

  const emailCheckHandler = () => {
    dispatch(__emailCheck({ email: input.email }));
    setEmailCheckTF(true);
  };

  const onClickHandler = () => {
    navigate("/signin");
  };

  return (
    <Layout>
      <HeadContainer>
        <div>
          <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
        </div>
        <div>
          <img src={LOGO}></img>
        </div>
      </HeadContainer>
      <StSignupBox>
        <InfoDiv>이메일</InfoDiv>
        <Div>
          <StInputBox2
            type="text"
            name="email"
            value={input.email}
            onChange={changeInputHandler}
            placeholder="Email"
          />
          <StInputButton onClick={emailCheckHandler}>
            인증번호 발송
          </StInputButton>
        </Div>
        {emailCheckTF && (
          <StInputBox
            type="text"
            name="emailCheck"
            value={input.emailCheck}
            onChange={changeInputHandler}
            placeholder="이메일 인증번호"
          />
        )}
        <InfoDiv>닉네임</InfoDiv>
        <StInputBox
          type="text"
          name="nickname"
          value={input.nickname}
          onChange={changeInputHandler}
          placeholder="숫자, 영문, 한글 조합 20자"
        />
        <InfoDiv>비밀번호</InfoDiv>
        <StInputBox
          type="password"
          name="password"
          value={input.password}
          onChange={changeInputHandler}
          placeholder="숫자, 영문, 특수문자 조합 최소 8자"
        />
        <StInputBox
          type="password"
          name="passwordCheck"
          value={input.passwordCheck}
          onChange={changeInputHandler}
          placeholder="비밀번호 재입력"
        />
        <StButton id="signupbutton" onClick={SubmitHandler}>
          회원가입
        </StButton>
        <StLoginBox>
          <h5>계정이 있으신가요?</h5>
          <span
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인
          </span>
        </StLoginBox>
      </StSignupBox>
    </Layout>
  );
};

export default SignUp;

// header
const HeadContainer = styled.div`
  gap: 100px;

  top: 20px;
  display: flex;
  align-items: center;
  margin-right: 120px;
  img {
    width: 143px;
    height: 50px;
  }
  span {
    /* text-align: center; */
    font-size: 24px;
    font-weight: bold;
  }
`;

const StSignupBox = styled.div`
  background-color: transparent;
  width: 375px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Div = styled.div`
  width: 84%;
  display: flex;
  justify-content: space-evenly;
`;

// 안내 div
const InfoDiv = styled.div`
  margin-top: 30px;
  margin-right: 270px;
  font-size: 14px;
  font-weight: 600;
`;
const StInputBox2 = styled.input`
  background-color: #fafafa;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 6px 16px 0 rgba(0, 0, 0, 0.1);
  &:focus,
  &:active {
    outline: none;
  }
  ::placeholder {
    color: #c4c4c4;
  }
  width: 182px;
  height: 38px;
  margin-top: 10px;
  padding-left: 10px;
  &:hover {
    border: 1px solid #f82323;
  }
`;
const StInputButton = styled.button`
  background-color: #3d6af2;
  border: none;
  font-size: 12px;
  color: white;

  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  width: 100px;
  height: 38px;
  margin-top: 10px;
  margin-left: 10px;
`;

const StInputBox = styled.input`
  background-color: #fafafa;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 6px 16px 0 rgba(0, 0, 0, 0.1);
  &:focus,
  &:active {
    outline: none;
  }
  ::placeholder {
    color: #c4c4c4;
  }
  width: 296px;
  height: 38px;
  margin-top: 10px;
  padding-left: 10px;
  &:hover {
    border: 1px solid #f82323;
  }
`;

const StButton = styled.button`
  width: 296px;
  height: 38px;
  margin-top: 30px;
  border: none;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #3d6af2;
  }
  background-color: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "#d9d9d9"
      : "#ececec"};
  cursor: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "pointer"
      : null};
`;

const StLoginBox = styled.div`
  font-size: 13px;
  width: 400px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  span {
    margin-left: 10px;
    color: #2288ee;
  }
`;
