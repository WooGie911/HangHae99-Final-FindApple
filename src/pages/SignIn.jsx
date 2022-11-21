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
      <StSignupBox>
        <StLoginBox>
          <Title>
            Findapple
          </Title>
          <StInputBox
            type="text"
            name="email"
            onChange={ChangeInputHandler}
            placeholder="이메일 입력"
            value={input.email}
          />
          <StInputBox
            type="text"
            name="password"
            onChange={ChangeInputHandler}
            placeholder="비밀번호 입력"
            value={input.password}
          />
          <StButton onClick={onSubmitHandler}>로그인</StButton>
          <br />
          <div>
            회원이 아니신가요?
            <A
              onClick={() => {
                navigate("/signup");
              }}
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
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 350px;
  left : -13px;
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

const Title = styled.div`
font-size: 30px;
font-weight: bold;
text-align: center;
margin-bottom: 100px;
`

const StInputBox = styled.input`
  width: 296px;
  height: 38px;
  margin-top: 10px;
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px #f2f2f2;
  &:focus,
  &:active {
    outline: none;
  }
  ::placeholder {
  color: #c4c4c4;
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
  font-weight: 600;
  font-size: 18px;
  background-color: ${({ username, password }) =>
    username !== "" && password !== "" ? "black" : "#ececec"};
  cursor: ${({ username, password }) =>
    username !== "" && password !== "" ? "pointer" : null};
`;

const A = styled.a`
  color: #2288EE;
  margin-left: 10px;
`
