import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";

const Pricingfinal = () => {
  const navigate = useNavigate();

  const { DetailPrice } = useSelector((state) => state.price);

  const checkReally = (data) => {
    if (window.confirm("이동하시겠습니까?")) {
      navigate(data);
    }
    console.log("DetailPrice", DetailPrice);
  };
  return (
    <>
      <Layout>
        <div>Pricingfinal</div>

        <div>
          <PricingList DetailPrice={DetailPrice} />

          <button onClick={() => window.location.replace(`/pricingInput`)}>
            가격책정 다시하기
          </button>
          <button
            onClick={() => {
              checkReally(`/postcreate`);
            }}
          >
            상품 등록
          </button>
          <button
            onClick={() => {
              checkReally(`/objectioncreate`);
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
