import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __getPriceInfo, __checkPrice } from "../redux/modules/PriceSlice";
import PricingList from "./PricingList";
import styled from "styled-components";
import back from "../assets/back.png";
import Layout from "./Layout";

const PricingText = () => {
  const state = useLocation();
  const data = state.state;
  const navigate = useNavigate();
  console.log("datdatadataa", data);

  return (
    <>
      <Layout>
        <TitleDiv>
          <Backbutton
            onClick={() => {
              navigate(-1);
            }}
          >
            〈
          </Backbutton>
          <span>상품 상세 정보</span>
        </TitleDiv>

        <div>
          <PricingList DetailPrice={data.options} />
        </div>
      </Layout>
    </>
  );
};

export default PricingText;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  border-bottom: solid 1px gray;
`;
const Backbutton = styled.button`
  position: absolute;
  left: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;
