import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";

const PricingText = () => {
  const state = useLocation();
  const data = state.state;
  const navigate = useNavigate();
  console.log("유즈로케이션data ", data);

  return (
    <>
      //*돌아가기 버튼
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        X
      </button>
      <div>
        <PricingList DetailPrice={data.DetailPrice} />
      </div>
    </>
  );
};

export default PricingText;
