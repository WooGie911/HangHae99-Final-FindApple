import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  __getPriceInfo,
  checkPricingDetail,
} from "../redux/modules/PriceSlice";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";

const Pricingfinal = () => {
  const navigate = useNavigate();

  const { DetailPrice } = useSelector((state) => state.price);

  return (
    <>
    <Layout>
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
      </Layout>
    </>
  );
};

export default Pricingfinal;
