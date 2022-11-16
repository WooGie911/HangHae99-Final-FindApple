import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  __getPriceInfo,
  checkPricingDetail,
} from "../redux/modules/PriceSlice";
import Layout from "./Layout";

const Pricingfinal = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  const data = state.state;
  const macOB = data.objMac;
  const phoneOB = data.objPhone;
  const Data = data.category === "macbook" ? macOB : phoneOB;

  const onsubmitHandler = () => {
    console.log("Data", Data);
    dispatch(checkPricingDetail("Data"));
  };
  return (
    <>
    <Layout>
      <div>Pricingfinal</div>

      <div>
        <label>category : {Data.category}</label>
        <br />
        <label>year : {Data.year}</label>
        <br />
        <label>model : {Data.model}</label>
        <br />
        <label>option : {Data.option}</label>
        <br />
        <label>batteryState : {Data.batteryState}</label>
        <br />
        <label>displayState : {Data.displayState}</label>
        <br />
        <label>scratchState : {Data.scratchState}</label>
        <br />
        <label>careOX : {Data.careOX}</label>
        <br />
        <label>careDate : {Data.careDate}</label>
        <br />
        <br />
        <button onClick={onsubmitHandler}>가격책정</button>
      </div>
      </Layout>
    </>
  );
};

export default Pricingfinal;
