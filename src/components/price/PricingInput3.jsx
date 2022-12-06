import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __checkPrice, __getPriceInfo } from "../../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput3 = ({ priceListState, setPriceListState, stepState }) => {
  const dispatch = useDispatch();
  const { getList3 } = useSelector((state) => state.price);
  let getInfo = {};

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setPriceListState({
      ...priceListState,
      [name]: value,
    });
    console.log(priceListState);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (priceListState.model === "" || priceListState.model === "model") {
      return alert("기종을 선택해주세요");
    }

    getInfo = {
      stepState: stepState + 1,
      API: `${priceListState.category}/${priceListState.years}/${priceListState.model}`,
      priceLists: priceListState,
    };

    dispatch(__getPriceInfo(getInfo));
  };

  return (
    <div>
      <div className=" flex-col p-[18px]">
        <div className=" flex items-center w-full h-14 font-semibold ">
          기종을 선택해주세요
        </div>
        <div className="text-DD mt-1">
          <select
            className=" w-full h-[38px] px-5 rounded-3xl border-[1px] border-DD "
            defaultValue={priceListState.model}
            name={"model"}
            onChange={onChangeHandler}
          >
            <option value={"model"}>model</option>
            {getList3 &&
              getList3.map((list, index) => {
                return (
                  <option key={index} value={list}>
                    {list}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center absolute w-full bottom-14 p-5 ">
        <PricingStep stepState={stepState} />
      </div>
      <button
        className=" absolute bottom-0 w-full h-14 text-white bg-CC"
        onClick={onSubmitHandler}
      >
        다음으로
      </button>
    </div>
  );
};

export default PricingInput3;
