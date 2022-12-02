import React from "react";
import { useDispatch } from "react-redux";
import { __Signin } from "../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hook/useInput";
import KakaoLogin from "../components/KakaoLogin";
import Layout from "../components/Layout";
import LOGO from "../assets/LOGO.svg";
import LOGOWHITE from "../assets/LOGOWHITE.svg";
import "../assets/font/font.css";

const SignIn = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //커스텀훅 useInput 사용
  const [input, setInput, ChangeInputHandler] = useInput(initialState);

  const onSubmitHandler = () => {
    if (input.email === "" || input.memberPw === "") {
      return alert("입력을 확인하세요.");
    }
    dispatch(__Signin(input));
    setInput(input);
  };
  const keyPress = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };
  return (
    <Layout>
      <StSignupBox>
        <StLoginBox>
          <Title src={LOGOWHITE}></Title>
          <StInputBox
            type="text"
            name="email"
            onChange={ChangeInputHandler}
            placeholder="아이디 입력"
            value={input.email}
          />
          <StInputBox
            type="password"
            name="password"
            onChange={ChangeInputHandler}
            placeholder="비밀번호 입력"
            value={input.password}
            onKeyPress={keyPress}
          />
          <StButton style={{ color: "black", fontFamily: 'Pretendard-Regular' }} onClick={onSubmitHandler}>
            로그인
          </StButton>
          <br />
          <div style={{ color: "white", fontSize: 12 }}>
            회원이 아니신가요?
            <A
              onClick={() => {
                navigate("/signup");
              }}
              style={{ color: "white", fontSize: 12 }}
            >
              회원가입
            </A>
          </div>
          <br />
          <KakaoLogin />
        </StLoginBox>
      </StSignupBox>
    </Layout>
  );
};

export default SignIn;

const StLoginBox = styled.div`
  position: relative;
  width: 375px;
  height: 100vh;
  background-color: #3d6af2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 350px;
  left: -13px;
`;

const StSignupBox = styled.div`
  width: 400px;
  margin-top: 30px;
  height: 10vh;
  background-color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Title = styled.img`
  position: relative;
  top: -100px;
  width: 143px;
  height: 36px;
`;

const StInputBox = styled.input`
  width: 296px;
  height: 38px;
  margin-top: 10px;
  background-color: #6488f5;

  border: none;
  border-radius: 5px;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
  &:focus,
  &:active {
    outline: none;
  }
  ::placeholder {
    color: white;
  }
  padding-left: 10px;
`;

const StButton = styled.button`
  width: 296px;
  height: 38px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Noto Sans";
  font-style: normal;
  line-height: 18px;
  font-weight: 600;
  font-size: 13px;
  background-color: ${({ username, password }) =>
    username !== "" && password !== "" ? "white" : "#ececec"};
  cursor: ${({ username, password }) =>
    username !== "" && password !== "" ? "pointer" : null};
`;

const A = styled.a`
  color: #2288ee;
  margin-left: 10px;
  cursor: pointer;
`;
