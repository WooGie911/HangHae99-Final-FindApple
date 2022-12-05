import React from "react";
import { useNavigate } from "react-router-dom";
import Layout2 from "../../components/commons/Layout2";
import IMG2 from "../../assets/IMG2.jpg";
import STEP2 from "../../assets/2-3.svg";

const Onboarding2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout2>
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
