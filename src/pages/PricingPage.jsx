import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import PricingInput1 from "../components/PricingInput1";
import PricingInput234 from "../components/PricingInput234";
import PricingInput5 from "../components/PricingInput5";
import { __getPriceInfo } from "../redux/modules/PriceSlice";

const PricingPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stepState } = useSelector((state) => state.price);
  const { getList } = useSelector((state) => state.price);
  const { priceLists } = useSelector((state) => state.price);
  const { BackAPI } = useSelector((state) => state.price);
  useEffect(() => {
    console.log("왜 두번눌리냐 백에이피아이", BackAPI);
  }, [BackAPI]);

  let Backapi = "";
  let backInfo = {};

  const BackFn = () => {
    console.log("stepState stepState", stepState);
    if (stepState === 5) {
      Backapi = `${priceLists.category}/${priceLists.years}/${priceLists.model}`;
    } else if (stepState === 4) {
      Backapi = `${priceLists.category}/${priceLists.years}`;
    } else if (stepState === 3) {
      Backapi = `${priceLists.category}`;
    } else if (stepState === 2) {
      Backapi = ``;
    }

    console.log("셋 전 backInfo", backInfo);
    console.log("셋 전 stepState", stepState);
    backInfo = {
      stepState: stepState - 1,
      API: BackAPI,
      priceLists: { ...priceLists },
      BackAPI: Backapi,
    };
    console.log("셋 후 backInfo", backInfo);

    console.log("뭐가문젠데 stepState", stepState);
    if (window.confirm("really?")) {
      dispatch(__getPriceInfo(backInfo));
      navigate(`/pricingPage/${BackAPI}`);
      console.log("뭐가문젠데 후 stepState", stepState);
    }
  };

  // useEffect(() => {
  //   console.log("stepState stepState", stepState);
  //   if (stepState === 5) {
  //     Backapi = `/${priceLists.category}/${priceLists.years}/${priceLists.model}`;
  //   } else if (stepState === 4) {
  //     Backapi = `/${priceLists.category}/${priceLists.years}`;
  //   } else if (stepState === 3) {
  //     Backapi = `/${priceLists.category}`;
  //   } else if (stepState === 2) {
  //     Backapi = `/`;
  //   }

  //   console.log("셋 전 backInfo", backInfo);
  //   console.log("셋 전 stepState", stepState);
  //   setBackInfo({
  //     stepState: stepState - 1,
  //     API: BackAPI,
  //     priceLists: priceLists,
  //     BackAPI: Backapi,
  //   });
  //   console.log("셋 후 backInfo", backInfo);
  // }, [params]);

  return (
    <>
      <Layout>
        <ContainerDiv>
          <TitleDiv>
            {stepState !== 1 && <Backbutton onClick={BackFn}>〈</Backbutton>}
            <Xbutton
              onClick={() => {
                navigate("/main");
              }}
            >
              X
            </Xbutton>
            <span>가격책정</span>
          </TitleDiv>

          {stepState === 1 && (
            <PricingInput1 params={params} stepState={stepState} />
          )}
          {(stepState === 2 || stepState === 3 || stepState === 4) && (
            <PricingInput234 params={params} stepState={stepState} />
          )}
          {stepState === 5 && (
            <PricingInput5 params={params} stepState={stepState} />
          )}
        </ContainerDiv>
      </Layout>
    </>
  );
};

export default PricingPage;

const ContainerDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: transparent;
  height: 100vh;
  width: 375px;
`;
const ContainerDiv1 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: transparent;
  height: 100%;
  width: 375px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

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
  /* background-color: blue; */
`;

const PriceInput = styled.input`
  position: absolute;
  width: 330px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: transparent;
`;
const DateInput = styled.input`
  position: absolute;
  width: 177px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-radius: 50px;
  border: 1px solid #c4c4c4;
  background-color: transparent;
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

const Xbutton = styled.button`
  position: absolute;
  right: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;
