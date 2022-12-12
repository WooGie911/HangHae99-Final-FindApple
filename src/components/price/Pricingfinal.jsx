import React from "react";
import Layout from "../commons/Layout";
import { useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../../redux/modules/PriceSlice";
import PricingList from "./PricingList";
import Xbutton from "../../assets/Xbutton.png";
import backArrow from "../../assets/pictures/backArrow.svg";

const Pricingfinal = () => {
  const navigate = useNavigate();

  const checkReally = (data) => {
    if (data === "/main") {
      if (window.confirm(`정말 떠나시겠습니까?`)) {
        navigate(data);
      }
    } else if (data === "/pricingPage") {
      if (window.confirm("모든 데이터를 새로 입력하시겠습니다?")) {
        window.location.replace(data);
      }
    } else if (data === "/postcreate") {
      if (window.confirm(`상품을 등록하시겠습니까?`)) {
        navigate(data);
      }
    } else if (data === "/objectioncreate") {
      if (window.confirm(`가격이 마음에 들지 않으십니까?`)) {
        navigate(data);
      }
    }
  };

  return (
    <Layout>
      <div className=" bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <img
          className="h-6 w-6 absolute left-3"
          onClick={() => {
            navigate(`/pricingPage`);
          }}
          src={backArrow}
        />
        <div>
          <div>상품상세정보</div>
        </div>
        <img
          className="  absolute right-4 cursor-pointer"
          src={Xbutton}
          onClick={() => checkReally(`/main`)}
        />
      </div>

      <PricingList />

      <ul className=" py-10 flex justify-center">
        <button
          className=" flex w-40 h-9 border-C4 border-[1px] rounded-3xl text-xs justify-center items-center text-C4"
          onClick={() => {
            checkReally(`/pricingPage`);
          }}
        >
          <div className="text-CC mr-1">처음부터</div> 다시 입력하기
        </button>
      </ul>
      <ul className="flex justify-between px-[18px] py-3 absolute bottom-0 font-semibold w-full">
        <button
          className="w-40 h-14 bg-CC text-white rounded-md"
          onClick={() => {
            checkReally(`/postcreate`);
          }}
        >
          상품 등록
        </button>
        <button
          className="w-40 h-14 bg-white text-CC rounded-md border-CC border-[1px]"
          onClick={() => {
            checkReally(`/objectioncreate`);
          }}
        >
          이의 제기
        </button>
      </ul>
    </Layout>
  );
};

export default Pricingfinal;
