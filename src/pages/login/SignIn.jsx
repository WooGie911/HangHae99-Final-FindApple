import React from "react";
import { useDispatch } from "react-redux";
import { __Signin } from "../../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import KakaoLogin from "../../components/login/KakaoLogin";
import Layout from "../../components/commons/Layout";
import LOGOWHITE from "../../assets/LOGOWHITE.svg";

const SignIn = () => {
  const initialState = {
    email: "",
    password: "",
  };
  localStorage.clear();
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
      <div className="flex justify-center items-center h-[100vh] bg-CC">
        <div className="flex-col text-sm">
          <div className="flex justify-center">
            <img className="w-36 h-8 mb-28" src={LOGOWHITE} />
          </div>
          <div className="flex justify-center">
            <input
              className="outline-none bg-translucent2 placeholder-white w-[296px] h-9 border-transparent rounded-md p-2 mb-4"
              type="text"
              name="email"
              onChange={ChangeInputHandler}
              placeholder="E-mail을 입력 해주세요"
              value={input.email}
              maxLength="320"
            />
          </div>
          <div className="flex justify-center">
            <input
              className=" outline-none bg-translucent2 placeholder-white w-[296px] h-9 rounded-md p-2 mb-4"
              type="password"
              name="password"
              onChange={ChangeInputHandler}
              placeholder="PASSWORD를 입력 해주세요"
              value={input.password}
              maxLength="16"
              onKeyPress={keyPress}
            />
          </div>
          <div className="flex justify-center">
            <button
              className=" w-[296px] h-9 bg-white rounded-md mt-4 font-semibold"
              onClick={onSubmitHandler}
            >
              로그인
            </button>
          </div>
          <div className="flex justify-center items-center text-xs text-white p-3 mb-3">
            <div>회원이 아니신가요?</div>
            <div
              className="text-KY ml-2 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </div>
          </div>
          <KakaoLogin />
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;

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
