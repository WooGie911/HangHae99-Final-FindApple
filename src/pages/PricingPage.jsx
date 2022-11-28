import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PricingInput2 from "../components/PricingInput2";

const PricingPage = () => {
  const params = useParams();
  const { stepState } = useSelector((state) => state.price);
  return (
    <>
      <Layout>
        <div>
          <PricingInput2 params={params} stepState={stepState} />
          <span>hi</span>
          <div>hello</div>
        </div>

        <div>
          <div>{stepState}</div>
          <div>stepBar 자리</div>
        </div>
      </Layout>
    </>
  );
};

export default PricingPage;
