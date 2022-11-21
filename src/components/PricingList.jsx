import React from "react";

const PricingList = ({ DetailPrice }) => {
  console.log("DetailPrice", DetailPrice);
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
          <label>macbookState : {DetailPrice.macbookState}</label>
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
          <label>iphoneState : {DetailPrice.iphoneState}</label>
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
