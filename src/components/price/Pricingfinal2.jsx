import React from "react";
import Layout from "../commons/Layout";
import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../../redux/modules/PriceSlice";
import PricingList from "./PricingList";
import Xbutton from "../../assets/pictures/Xbutton.png";

const Pricingfinal2 = ({ setDetailToggle }) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className=" bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <div>
          <div>상품상세정보</div>
        </div>
        <img
          className="  absolute right-4 cursor-pointer"
          src={Xbutton}
          onClick={() => setDetailToggle(false)}
        />
      </div>

      <PricingList />
    </Layout>
  );
};

export default Pricingfinal2;
