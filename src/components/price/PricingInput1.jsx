import React from "react";
import { useDispatch } from "react-redux";
import { __checkPrice, __getPriceInfo } from "../../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput1 = ({ priceListState, setPriceListState, stepState }) => {
  const dispatch = useDispatch();
  let getInfo = {};

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setPriceListState({
      ...priceListState,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      priceListState.category === "" ||
      priceListState.category === "category"
    ) {
      return alert("카테고리를 선택해주세요");
    }
    getInfo = {
      stepState: stepState + 1,
      API: `${priceListState.category}`,
      priceLists: priceListState,
    };

    dispatch(__getPriceInfo(getInfo));
  };

  return (
    <ul>
      <div className="flex-col p-[18px]">
        <div className="flex items-center w-full h-14 font-bold">
          카테고리를 선택해주세요
        </div>
        <ul className="text-DD flex mt-1">
          {priceListState.category === "macbook" ? (
            <li className="mr-3 flex">
              <input
                className="appearance-none peer"
                type="radio"
                id="category-macbook"
                name="category"
                value="macbook"
                defaultChecked
                onClick={onChangeHandler}
              />
              <label
                className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                htmlFor="category-macbook"
              >
                macbook
              </label>
            </li>
          ) : (
            <li className="mr-3 flex">
              <input
                className="appearance-none peer"
                type="radio"
                id="category-macbook"
                name="category"
                value="macbook"
                onClick={onChangeHandler}
              />
              <label
                className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                htmlFor="category-macbook"
              >
                macbook
              </label>
            </li>
          )}
          {priceListState.category === "iphone" ? (
            <li className="mr-3 flex">
              <input
                className="appearance-none peer"
                type="radio"
                id="category-iphone"
                name="category"
                value="iphone"
                defaultChecked
                onClick={onChangeHandler}
              />
              <label
                className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                htmlFor="category-iphone"
              >
                iphone
              </label>
            </li>
          ) : (
            <li className="mr-3 flex">
              <input
                className="appearance-none peer"
                type="radio"
                id="category-iphone"
                name="category"
                value="iphone"
                onClick={onChangeHandler}
              />
              <label
                className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                htmlFor="category-iphone"
              >
                iphone
              </label>
            </li>
          )}
        </ul>
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
    </ul>
  );
};

export default PricingInput1;
