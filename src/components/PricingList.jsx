import React from "react";

const PricingList = ({ DetailPrice }) => {
  return (
    <>
      <br />
      <br />
      <div>PricingList</div>

      {DetailPrice.category === "macbook" ? (
        <div>
          <div>expectPrice : {DetailPrice.getPrice}</div>
          <label>category : {DetailPrice.category}</label>
          <br />
          <label>year : {DetailPrice.year}</label>
          <br />
          <label>model : {DetailPrice.model}</label>
          <br />
          <label>option : {DetailPrice.option}</label>
          <br />
          <label>batteryState : {DetailPrice.batteryState}</label>
          <br />
          <label>keyboard: : {DetailPrice.keyboard}</label>
          <br />
          <label>ram : {DetailPrice.ram}</label>
          <br />
          <label>storage: {DetailPrice.storage}</label>
          <br />
          <label>careOX : {DetailPrice.careOX}</label>
          <br />
          <label>careDate : {DetailPrice.careDate}</label>
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div>
          <div>expectPrice : {DetailPrice.getPrice}</div>
          <label>category : {DetailPrice.category}</label>
          <br />
          <label>year : {DetailPrice.year}</label>
          <br />
          <label>model : {DetailPrice.model}</label>
          <br />
          <label>option : {DetailPrice.option}</label>
          <br />
          <label>batteryState : {DetailPrice.batteryState}</label>
          <br />
          <label>displayState : {DetailPrice.displayState}</label>
          <br />
          <label>scratchState : {DetailPrice.scratchState}</label>
          <br />
          <label>careOX : {DetailPrice.careOX}</label>
          <br />
          <label>careDate : {DetailPrice.careDate}</label>
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default PricingList;
