import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";

const Pricingfinal = () => {
  const navigate = useNavigate();

  const { DetailPrice } = useSelector((state) => state.price);

  return (
    <>
      <div>Pricingfinal</div>

      <div>
        <PricingList DetailPrice={DetailPrice} />

        <button
          onClick={() => {
            navigate(`/pricingInput`);
          }}
        >
          가격책정 다시하기
        </button>
        <button
          onClick={() => {
            navigate("/postcreate");
          }}
        >
          상품 등록
        </button>
        <button
          onClick={() => {
            navigate(`/objectioncreate`);
          }}
        >
          이의 제기
        </button>
      </div>
    </>
  );
};

export default Pricingfinal;
