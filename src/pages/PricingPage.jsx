import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout2 from "../components/commons/Layout2";
import PricingInput1 from "../components/price/PricingInput1";
import PricingInput2 from "../components/price/PricingInput2";
import PricingInput3 from "../components/price/PricingInput3";
import PricingInput4 from "../components/price/PricingInput4";
import PricingInput5 from "../components/price/PricingInput5";
import { swichStepState, __getPriceInfo } from "../redux/modules/PriceSlice";
import backArrow from "../assets/backArrow.svg";
import Xbutton from "../assets/Xbutton.png";

const PricingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stepState } = useSelector((state) => state.price);
  const { priceLists } = useSelector((state) => state.price);
  const [priceListState, setPriceListState] = useState(priceLists);

  const BackFn = () => {
    dispatch(swichStepState({ stepState: stepState - 1 }));
  };

  return (
    <Layout2>
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        {stepState !== 1 && (
          <img
            className="h-6 w-6 absolute left-3 cursor-pointer"
            onClick={() => BackFn()}
            src={backArrow}
          />
        )}
        <div>가격책정</div>
        <img
          className="  absolute right-4 cursor-pointer"
          src={Xbutton}
          onClick={() => navigate("/main")}
        />
      </div>

      {stepState === 1 && (
        <PricingInput1
          priceListState={priceListState}
          setPriceListState={setPriceListState}
          stepState={stepState}
        />
      )}
      {stepState === 2 && (
        <PricingInput2
          priceListState={priceListState}
          setPriceListState={setPriceListState}
          stepState={stepState}
        />
      )}
      {stepState === 3 && (
        <PricingInput3
          priceListState={priceListState}
          setPriceListState={setPriceListState}
          stepState={stepState}
        />
      )}
      {stepState === 4 && (
        <PricingInput4
          priceListState={priceListState}
          setPriceListState={setPriceListState}
          stepState={stepState}
        />
      )}
      {stepState === 5 && (
        <PricingInput5
          priceListState={priceListState}
          setPriceListState={setPriceListState}
          stepState={stepState}
        />
      )}
    </Layout2>
  );
};

export default PricingPage;
