import React from "react";

const PricingText = ({ Data }) => {
  return (
    <>
      <div>PricingText</div>
      <div>
        <label>nickname : {Data.nickname}</label>
        <br />
        <label>제목 : {Data.title}</label>
        <br />
        <label>예상가격 : {Data.expectPrice}</label>
        <br />
        <label>판매 가격 : {Data.userPrice}</label>
        <br />
        <label>내용 : {Data.content}</label>
        <br />
      </div>
    </>
  );
};

export default PricingText;
