import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __checkPrice, __getPriceInfo } from "../../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput2 = ({ priceListState, setPriceListState, stepState }) => {
  const dispatch = useDispatch();
  const { getList2 } = useSelector((state) => state.price);
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

    if (priceListState.years == 0) {
      return alert("출시년도를 선택해주세요");
    }
    getInfo = {
      stepState: stepState + 1,
      API: `${priceListState.category}/${priceListState.years}`,
      priceLists: priceListState,
    };

    dispatch(__getPriceInfo(getInfo));
  };

  return (
    <div>
      <div className=" flex-col p-[18px] ">
        <div className="  flex items-center w-full h-14 font-semibold">
          출시년도를 선택해주세요
        </div>
        <ul className=" mt-1 text-DD grid grid-cols-4 gap-3 place-items-center">
          {getList2 &&
            getList2.map((list, index) => {
              return (
                <div key={index}>
                  {priceListState.years === String(list) ? (
                    <li className="flex">
                      <input
                        className="appearance-none peer"
                        type="radio"
                        id={list}
                        name="years"
                        value={list}
                        onClick={onChangeHandler}
                        defaultChecked
                      />
                      <label
                        className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                        htmlFor={list}
                      >
                        {list}
                      </label>
                    </li>
                  ) : (
                    <li key={index} className="flex">
                      <input
                        className="appearance-none peer"
                        type="radio"
                        id={list}
                        name="years"
                        value={list}
                        onClick={onChangeHandler}
                      />
                      <label
                        className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
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

export default PricingInput2;
