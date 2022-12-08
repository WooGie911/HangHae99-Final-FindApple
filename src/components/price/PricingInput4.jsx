import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __checkPrice, __getPriceInfo } from "../../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput4 = ({ priceListState, setPriceListState, stepState }) => {
  const dispatch = useDispatch();
  const { getList4 } = useSelector((state) => state.price);
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
    if (priceListState.category === "macbook") {
      if (
        priceListState.options === "" ||
        priceListState.options === "options"
      ) {
        return alert("화면크기을 선택해주세요");
      }
    } else {
      if (
        priceListState.options === "" ||
        priceListState.options === "options"
      ) {
        return alert("용량을 선택해주세요");
      }
    }

    if (priceListState.category === "iphone") {
      getInfo = {
        stepState: stepState + 1,
        API: `${priceListState.category}/${priceListState.years}/${priceListState.model}`,
        priceLists: priceListState,
      };
    } else {
      getInfo = {
        stepState: stepState + 1,
        API: `${priceListState.category}/${priceListState.years}/${priceListState.model}/${priceListState.options}`,
        priceLists: priceListState,
      };
    }
    dispatch(__getPriceInfo(getInfo));
  };

  return (
    <div>
      <div className=" flex-col p-[18px]">
        {priceListState.category === "macbook" ? (
          <div className=" flex items-center w-full h-14 font-bold ">
            화면크기을 선택해주세요 (inch)
          </div>
        ) : (
          <div className=" flex items-center w-full h-14 font-bold ">
            용량을 선택해주세요
          </div>
        )}

        <ul className="text-DD flex mt-1">
          {getList4 &&
            getList4.map((list, index) => {
              return (
                <div key={index}>
                  {priceListState.options == list ? (
                    <li className="mr-3 flex">
                      <input
                        className="appearance-none peer"
                        type="radio"
                        id={list}
                        name="options"
                        value={list}
                        onClick={onChangeHandler}
                        defaultChecked
                      />
                      <label
                        className="flex  items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                        htmlFor={list}
                      >
                        {list}
                      </label>
                    </li>
                  ) : (
                    <li key={index} className="mr-3 flex">
                      <input
                        className="appearance-none peer"
                        type="radio"
                        id={list}
                        name="options"
                        value={list}
                        onClick={onChangeHandler}
                      />
                      <label
                        className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                        htmlFor={list}
                      >
                        {list}
                      </label>
                    </li>
                  )}
                </div>
              );
            })}
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
    </div>
  );
};

export default PricingInput4;
