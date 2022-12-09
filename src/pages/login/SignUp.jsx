import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __SignUp, __emailCheck } from "../../redux/modules/LoginSlice";
import { useNavigate } from "react-router-dom";
import useInput from "../../hook/useInput";
import Layout from "../../components/commons/Layout";
import LOGO from "../../assets/LOGO.png";
import backArrow from "../../assets/backArrow.svg";

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
  const passwordCheck =
    /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (
      input.email === "" ||
      input.nickname === "" ||
      input.password === "" ||
      input.passwordCheck === ""
    ) {
      return alert("입력을 확인해주세요.");
    }

    if (input.emailCheck !== emailCheckData) {
      return alert("인증번호가 일치하지 않습니다.");
    }

    if (input.password !== input.passwordCheck) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    const AAA = {
      email: input.email,
      nickname: input.nickname,
      password: input.password,
    };

    if (window.confirm("회원가입하시겠습니까?")) {
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
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold ">
        <img
          className="h-6 w-6 absolute left-3"
          onClick={() => {
            onClickHandler();
          }}
          src={backArrow}
        />
        <img className="w-28" src={LOGO} />
      </div>
      <div className="flex items-center h-[100vh] justify-center">
        <div className="flex-col text-xs">
          <div className="font-semibold mb-1">이메일</div>
          <div className="flex justify-center ">
            <div className="flex justify-between w-[296px]">
              <input
                className=" outline-none bg-white placeholder-C4 w-[182px] h-9 rounded-md p-2 mb-4 border-C4 border-[1px]"
                type="text"
                name="email"
                value={input.email}
                onChange={changeInputHandler}
                placeholder="Email"
                maxLength="320"
              />
              <button
                className="w-[100px] h-9 bg-CC rounded-md text-white "
                onClick={emailCheckHandler}
              >
                인증번호 발송
              </button>
            </div>
          </div>
          <div className="flex justify-center ">
            {emailCheckTF && (
              <input
                className=" outline-none bg-white placeholder-C4 w-[296px] h-9 rounded-md p-2 mb-4 border-C4 border-[1px]"
                type="text"
                name="emailCheck"
                value={input.emailCheck}
                onChange={changeInputHandler}
                placeholder="인증번호를 입력해주세요"
                maxLength="8"
              />
            )}
          </div>
          <div className="font-semibold mb-1">닉네임</div>
          <div className="flex justify-center ">
            <input
              className=" outline-none bg-white placeholder-C4 w-[296px] h-9 rounded-md p-2 mb-4 border-C4 border-[1px]"
              type="text"
              name="nickname"
              value={input.nickname}
              onChange={changeInputHandler}
              placeholder="숫자, 영문, 한글 조합 10자"
              maxLength="10"
            />
          </div>
          <div className="font-semibold mb-1">비밀번호</div>
          <div className="flex justify-center flex-col	">
            <input
              className=" outline-none bg-white placeholder-C4 w-[296px] h-9 rounded-md p-2 mb-1 border-C4 border-[1px]"
              type="password"
              name="password"
              value={input.password}
              onChange={changeInputHandler}
              placeholder="숫자, 영문, 특수문자 조합 최소 8자"
              maxLength="16"
            />
            {passwordCheck.test(input.password) === false && (
              <p className=" text-red text-xs mb-2">
                비밀번호를 양식에 맞게 입력해주세요
              </p>
            )}
          </div>

          <div className="flex justify-center flex-col	 ">
            <input
              className=" outline-none bg-white placeholder-C4 w-[296px] h-9 rounded-md p-2 mb-1 border-C4 border-[1px]"
              type="password"
              name="passwordCheck"
              value={input.passwordCheck}
              onChange={changeInputHandler}
              placeholder="비밀번호를 한번 더 입력해주세요"
              maxLength="16"
            />
            {input.password !== input.passwordCheck && (
              <p className=" text-red text-xs mb-2">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <div className="flex justify-center ">
            <button
              className=" w-[296px] h-9 bg-CC text-white rounded-md mt-28 text-sm"
              onClick={SubmitHandler}
            >
              회원가입
            </button>
          </div>
          <div className="flex justify-center text-xs mt-5">
            <div>계정이 있으신가요?</div>
            <div
              className="text-CC ml-2 cursor-pointer"
              onClick={() => {
                onClickHandler();
              }}
            >
              로그인
            </div>
          </div>
          <div className="h-40" />
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
