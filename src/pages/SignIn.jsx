import React from "react";
import { useDispatch } from "react-redux";
import { __Signin } from "../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hook/useInput";
import KakaoLogin from "../components/KakaoLogin";
import Layout from "../components/Layout";

const SignIn = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //커스텀훅 useInput 사용
  const [input, setInput, ChangeInputHandler] = useInput(initialState);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.email === "" || input.memberPw === "") {
      return alert("입력을 확인하세요.");
    }
    dispatch(__Signin(input));
    setInput(input);
  };

  return (
    <Layout>
    <StWrapper>
      <StSignupBox>
        <StLoginBox>
          <StInputBox
            type="text"
            name="email"
            onChange={ChangeInputHandler}
            placeholder="EMAIL"
            value={input.email}
          />
          <StInputBox
            type="text"
            name="password"
            onChange={ChangeInputHandler}
            placeholder="PASSWORD"
            value={input.password}
          />
          <StButton onClick={onSubmitHandler}>로그인</StButton>
          <br />
          <div>
            계정이 없으신가요?
            <text
              onClick={() => {
                navigate("/signup");
              }}
            >
              가입하기
            </text>
          </div>
          <br />
          <KakaoLogin />
        </StLoginBox>
      </StSignupBox>
    </StWrapper>
    </Layout>
  );
};

export default SignIn;

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StLoginBox = styled.div`
  width: 600px;
  height: 500px;
  background-color: white;
  border: 1px solid #bababa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const StInputBox = styled.input`
  width: 70%;
  height: 35px;
  margin-top: 10px;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  padding-left: 10px;
`;

const StButton = styled.button`
  width: 70%;
  height: 35px;
  margin-top: 30px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 18px;
  background-color: ${({ username, password }) =>
    username !== "" && password !== "" ? "#0095f6" : "#ececec"};
  cursor: ${({ username, password }) =>
    username !== "" && password !== "" ? "pointer" : null};
`;
