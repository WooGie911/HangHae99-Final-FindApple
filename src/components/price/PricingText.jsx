import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../../redux/modules/PriceSlice";
import PricingDetailList from "./PricingDetailList";
import Layout from "../commons/Layout";
import backArrow from "../../assets/pictures/backArrow.svg";

const PricingText = () => {
  const state = useLocation();
  const data = state.state;
  const navigate = useNavigate();

  return (
    <Layout>
      <div className=" bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <img
          className="h-6 w-6 absolute left-3"
          onClick={() => {
            navigate(-1);
          }}
          src={backArrow}
        />
        <div>
          <div>상품상세정보</div>
        </div>
      </div>
      <div>
        <PricingDetailList DetailPrice={data.options} />
      </div>
    </Layout>
  );
};

export default PricingText;
