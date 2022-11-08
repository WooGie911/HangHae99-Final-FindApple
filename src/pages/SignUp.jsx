import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __SignUp, __emailCheck } from "../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import useInput from "../hook/useInput";

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
    dispatch(__SignUp(input));
    setInput(initialstate);
  };

  const emailCheckHandler = () => {
    dispatch(__emailCheck(input.email));
    setEmailCheckTF(true);
  };

  return (
    <StWrapper>
      <StSignupBox>
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
            placeholder="이메일 메일인증"
          />
        )}

        <StInputBox
          type="text"
          name="nickname"
          value={input.nickname}
          onChange={changeInputHandler}
          placeholder="Nickname"
        />

        <StInputBox
          type="text"
          name="password"
          value={input.password}
          onChange={changeInputHandler}
          placeholder="Password"
        />
        <StInputBox
          type="text"
          name="passwordCheck"
          value={input.passwordCheck}
          onChange={changeInputHandler}
          placeholder="PasswordCheck"
        />
        <StButton onClick={SubmitHandler}>회원가입</StButton>

        <StLoginBox>
          <h5>계정이 있으신가요?</h5>
          <button
            onClick={() => {
              navigate("/signin");
            }}
          >
            로그인
          </button>
        </StLoginBox>
      </StSignupBox>
    </StWrapper>
  );
};

export default SignUp;

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StSignupBox = styled.div`
  background-color: white;
  border: 1px solid #dbdbdb;
  width: 400px;
  height: 600px;
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
const StInputBox2 = styled.input`
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  width: 40%;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
`;
const StInputButton = styled.button`
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  width: 30%;
  height: 40px;
  margin-top: 10px;
`;

const StInputBox = styled.input`
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  width: 66%;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
`;

const StButton = styled.button`
  width: 280px;
  height: 35px;
  margin-top: 30px;
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 7px;
  background-color: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "#0095f6"
      : "#ececec"};
  cursor: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "pointer"
      : null};
`;

const StLoginBox = styled.div`
  width: 400px;
  height: 10vh;
  margin-top: 15px;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  border-radius: 1px solid #bababa;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;