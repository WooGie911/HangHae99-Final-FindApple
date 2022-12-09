import React from "react";
import { useNavigate } from "react-router-dom";
import Layout2 from "../../components/commons/Layout2";
import IMG3 from "../../assets/ThirdIMG.jpg";
import STEP3 from "../../assets/3-3.svg";
import nextArrow from "../../assets/nextArrow.png";
import backArrow from "../../assets/backArrow.svg";

const Onboarding3 = () => {
  const navigate = useNavigate();
  const onClickHandler = (data) => {
    navigate(data);
  };

  return (
    <>
      <Layout2>
        <div className="  flex relative items-center p-[18px] h-[60px] text-OO text-xs font-semibold border-b-[1px] border-D9 ">
          <img
            className="h-6 w-6  cursor-pointer"
            onClick={() => {
              onClickHandler("/onboarding2");
            }}
            src={backArrow}
          />
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <ul className="flex-col ">
            <li className="flex-col text-2xl font-semibold mb-10">
              <div className="flex justify-center">
                가격이 마음에 들지 않는다면?
              </div>
            </li>
            <li className="flex-col justify-center text-sm text-DD">
              <div className="flex justify-center">
                <div className="text-CC">이의제기</div>를 통해 유저들과 의견을
                나눠보세요.
              </div>
            </li>
            <li className="flex justify-center mt-20">
              <img src={IMG3} />
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center absolute w-full bottom-14 p-5 ">
          <img src={STEP3} />
        </div>
        <button
          className=" absolute bottom-0 w-full h-14 text-white bg-CC"
          onClick={() => {
            navigate(`/signin`);
          }}
        >
          바로 시작하기
        </button>
      </Layout2>
    </>
  );
};

export default Onboarding3;
