import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";
import styled from "styled-components";
import back from "../assets/back.png";

const PricingText = () => {
  const state = useLocation();
  const data = state.state;
  const navigate = useNavigate();
  console.log("datdatadataa", data);
  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <HeadContainer>
      <div>
        <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
        <span>상품 상세 정보</span>

      </div>
      </HeadContainer>
      <hr/>
      <div>
        <PricingList DetailPrice={{ ...data.DetailPrice }} />
      </div>
    </>
  );
};

export default PricingText;
const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;
  img {
    float: left;
    margin-right : 110px;
  }
  span {
    /* text-align: center; */
    font-size: 17px;
  }
`;