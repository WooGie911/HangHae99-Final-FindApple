import React from "react";
import { useNavigate } from "react-router-dom";
import Layout2 from "../../components/commons/Layout2";
import IMG1 from "../../assets/IMG1.jpg";
import STEP1 from "../../assets/1-3.svg";
import nextArrow from "../../assets/nextArrow.png";
import backArrow from "../../assets/backArrow.svg";

const Onboarding1 = () => {
  const navigate = useNavigate();
  // 뒤로가기
  const onClickHandler = (data) => {
    navigate(data);
  };

  return (
    <>
      <Layout2>
        <div className="  flex relative items-center justify-end p-[18px] h-[60px] text-OO text-xs font-semibold border-b-[1px] border-D9 ">
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

        <div className="flex  justify-center items-center h-[100vh]">
          <ul className="flex-col ">
            <li className="flex-col text-2xl font-semibold mb-12">
              <div className="flex justify-center">애플 중고</div>
              <div className="flex justify-center">얼마에 팔아야 할까?</div>
            </li>
            <li className="flex-col justify-center text-sm text-DD">
              <div className="flex justify-center">
                파인드애플은
                <div className="text-CC">애플 중고 물품 가격을 산정</div>하고,
              </div>
              <div className="flex justify-center">
                책정된 가격이 마음에 들면
              </div>
              <div className="flex justify-center">
                <div className="text-CC">책정된 가격에 판매</div>할 수 있는
                서비스입니다.
              </div>
            </li>
            <li className="flex justify-center mt-28">
              <img src={IMG1} />
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center absolute w-full bottom-14 p-5 ">
          <img src={STEP1} />
        </div>
        <button
          className=" absolute bottom-0 w-full h-14 text-white bg-CC"
          onClick={() => {
            navigate(`/onboarding2`);
          }}
        >
          다음으로
        </button>
      </Layout2>
    </>
  );
};

export default Onboarding1;
