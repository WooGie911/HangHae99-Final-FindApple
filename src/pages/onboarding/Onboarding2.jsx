import React from "react";
import { useNavigate } from "react-router-dom";
import Layout2 from "../../components/commons/Layout2";
import IMG2 from "../../assets/pictures/onboarding/IMG2.jpg";
import STEP2 from "../../assets/pictures/onboarding/2-3.svg";
import nextArrow from "../../assets/pictures/nextArrow.png";
import backArrow from "../../assets/pictures/backArrow.svg";

const Onboarding2 = () => {
  const navigate = useNavigate();
  const onClickHandler = (data) => {
    navigate(data);
  };

  return (
    <>
      <Layout2>
        <div className="  flex relative items-center justify-between p-[18px] h-[60px] text-OO text-xs font-semibold border-b-[1px] border-D9 ">
          <img
            className="h-6 w-6  cursor-pointer"
            onClick={() => {
              onClickHandler("/onboarding1");
            }}
            src={backArrow}
          />
          <div
            className=" flex items-center cursor-pointer"
            onClick={() => {
              onClickHandler("/signin");
            }}
          >
            <div>건너뛰기</div>
            <img className="h-4 " src={nextArrow} />
          </div>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <ul className="flex-col ">
            <li className="flex-col text-2xl font-semibold mb-10">
              <div className="flex justify-center">시세에 맞는 물품들을</div>
              <div className="flex justify-center">안심하고 구매하세요!</div>
            </li>
            <li className="flex-col justify-center text-sm text-DD">
              <div className="flex justify-center">
                <div className="text-CC">애플 심판관이</div>
                정해드립니다.
              </div>
            </li>
            <li className="flex justify-center mt-20">
              <img src={IMG2} />
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center absolute w-full bottom-14 p-5 ">
          <img src={STEP2} />
        </div>
        <button
          className=" absolute bottom-0 w-full h-14 text-white bg-CC"
          onClick={() => {
            navigate(`/onboarding3`);
          }}
        >
          다음으로
        </button>
      </Layout2>
    </>
  );
};

export default Onboarding2;
