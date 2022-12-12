import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __checkPrice, __getPriceInfo } from "../../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput5 = ({ priceListState, setPriceListState, stepState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getList5 } = useSelector((state) => state.price);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setPriceListState({
      ...priceListState,
      [name]: value,
    });
  };

  const onSubmitHandler = () => {
    if (priceListState.category === "macbook") {
      if (priceListState.ram === "" || priceListState.ram === "ram") {
        return alert("메모리를 선택해주세요");
      }
      if (
        priceListState.storage === "" ||
        priceListState.storage === "storage"
      ) {
        return alert("SSD 용량을 선택해주세요");
      }
      if (priceListState.batteryState === 0) {
        return alert("배터리 사이클을 입력해주세요");
      }
      if (
        priceListState.macbookState === "" ||
        priceListState.macbookState === "macbookState"
      ) {
        return alert("맥북 상태를 선택해주세요");
      }
      if (priceListState.careOX === "" || priceListState.careOX === "careOX") {
        return alert("애플케어 유무를 선택해주세요");
      }
      if (priceListState.careOX === "O") {
        if (priceListState.careDate === "") {
          return alert("애플케어 보증기간을 선택해주세요");
        }
      }
    }
    if (priceListState.category === "iphone") {
      if (
        priceListState.iphoneState === "" ||
        priceListState.iphoneState === "iphoneState"
      ) {
        return alert("아이폰 상태를 선택해주세요");
      }

      if (priceListState.batteryState === 0) {
        return alert("배터리 성능 최대치를 입력해주세요");
      }

      if (priceListState.careOX === "" || priceListState.careOX === "careOX") {
        return alert("애플케어 유무를 선택해주세요");
      }
      if (priceListState.careOX === "O") {
        if (priceListState.careDate === "") {
          return alert("애플케어 보증기간을 선택해주세요");
        }
      }
    }

    let objMac = {};
    let objMac2 = {};
    if (priceListState.category === "macbook") {
      objMac = {
        category: priceListState.category,
        years: Number(priceListState.years),
        model: priceListState.model,
        options: priceListState.options,
        ram: priceListState.ram,
        keyboard: getList5.keyboard[0],
        storage: priceListState.storage,
        batteryState: Number(priceListState.batteryState),
        macbookState: priceListState.macbookState,
        careOX: priceListState.careOX,
        careDate: priceListState.careDate,
      };
      objMac2 = {
        category: priceListState.category,
        years: Number(priceListState.years),
        model: priceListState.model,
        options: priceListState.options,
        ram: priceListState.ram,
        keyboard: getList5.keyboard[0],
        storage: priceListState.storage,
        macbookState: priceListState.macbookState,
        batteryState: Number(priceListState.batteryState),
        careOX: priceListState.careOX,
        careDate: "",
      };
    }
    const objPhone = {
      category: priceListState.category,
      years: Number(priceListState.years),
      model: priceListState.model,
      options: priceListState.options,
      batteryState: Number(priceListState.batteryState),
      iphoneState: priceListState.iphoneState,
      careOX: priceListState.careOX,
      careDate: priceListState.careDate,
    };

    const objPhone2 = {
      category: priceListState.category,
      years: Number(priceListState.years),
      model: priceListState.model,
      options: priceListState.options,
      batteryState: Number(priceListState.batteryState),
      iphoneState: priceListState.iphoneState,
      careOX: priceListState.careOX,
      careDate: "",
    };

    const Data =
      priceListState.category === "macbook"
        ? priceListState.careOX === "false"
          ? objMac2
          : objMac
        : priceListState.careOX === "false"
        ? objPhone2
        : objPhone;

    const passData = {
      category: priceListState.category,
      Data: Data,
      priceLists: priceListState,
    };

    if (window.confirm(`가격책정을 시작할까요?`)) {
      dispatch(__checkPrice(passData));
      navigate(`/Pricingfinal`);
    }
  };

  return (
    <div>
      <div>
        {priceListState.category === "macbook" ? (
          <div>
            <div className=" flex-col pt-[18px] mt-1 px-[18px]">
              <div className=" flex items-center w-full h-12 font-bold ">
                램 메모리
              </div>

              <ul className="text-DD flex ">
                {getList5.ram &&
                  getList5.ram.map((list, index) => {
                    return (
                      <div key={index}>
                        {priceListState.ram === list ? (
                          <li className="mr-3 flex">
                            <input
                              className="appearance-none peer"
                              type="radio"
                              id={list}
                              name="ram"
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
                              name="ram"
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

            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-12 mt-4 font-semibold ">
                SSD 용량
              </div>
              <div className="  text-DD">
                <ul className="text-DD flex mt-1 ">
                  {getList5.storage &&
                    getList5.storage.map((list, index) => {
                      return (
                        <div key={index}>
                          {priceListState.storage === list ? (
                            <li className="mr-3 flex">
                              <input
                                className="appearance-none peer"
                                type="radio"
                                id={list}
                                name="storage"
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
                                name="storage"
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
            </div>

            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-14 font-semibold ">
                배터리 사이클
              </div>
              <div className="  mt-1 text-DD">
                <input
                  className="w-full h-[38px] px-3 rounded-3xl border-[1px] border-DD "
                  placeholder="배터리 사이클을 입력해주세요"
                  value={priceListState.batteryState || ""}
                  type="Number"
                  min="0"
                  max="100"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-14 font-semibold ">
                맥북 상태
              </div>

              <ul className="text-DD mt-1 flex">
                {priceListState.macbookState === "Class A" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class A"
                      name="macbookState"
                      value="Class A"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class A"
                    >
                      A급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class A"
                      name="macbookState"
                      value="Class A"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class A"
                    >
                      A급
                    </label>
                  </li>
                )}

                {priceListState.macbookState === "Class B" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class B"
                      name="macbookState"
                      value="Class B"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class B"
                    >
                      B급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class B"
                      name="macbookState"
                      value="Class B"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class B"
                    >
                      B급
                    </label>
                  </li>
                )}

                {priceListState.macbookState === "Class C" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class C"
                      name="macbookState"
                      value="Class C"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class C"
                    >
                      C급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="macbookState-Class C"
                      name="macbookState"
                      value="Class C"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="macbookState-Class C"
                    >
                      C급
                    </label>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-14 font-semibold ">
                아이폰 상태
              </div>

              <ul className="text-DD mt-1 flex">
                {priceListState.iphoneState === "Class A" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class A"
                      name="iphoneState"
                      value="Class A"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class A"
                    >
                      A급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class A"
                      name="iphoneState"
                      value="Class A"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class A"
                    >
                      A급
                    </label>
                  </li>
                )}

                {priceListState.iphoneState === "Class B" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class B"
                      name="iphoneState"
                      value="Class B"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class B"
                    >
                      B급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class B"
                      name="iphoneState"
                      value="Class B"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class B"
                    >
                      B급
                    </label>
                  </li>
                )}

                {priceListState.iphoneState === "Class C" ? (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class C"
                      name="iphoneState"
                      value="Class C"
                      defaultChecked
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class C"
                    >
                      C급
                    </label>
                  </li>
                ) : (
                  <li className="mr-3 flex">
                    <input
                      className="appearance-none peer"
                      type="radio"
                      id="iphoneState-Class C"
                      name="iphoneState"
                      value="Class C"
                      onClick={onChangeHandler}
                    />
                    <label
                      className="flex items-center h-[38px] px-4 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                      htmlFor="iphoneState-Class C"
                    >
                      C급
                    </label>
                  </li>
                )}
              </ul>
            </div>

            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-14 font-semibold ">
                배터리 성능 최대치
              </div>
              <div className="  mt-1 text-DD">
                <input
                  className="w-full h-[38px] px-3 rounded-3xl border-[1px] border-DD "
                  placeholder="0% ~ 100%"
                  value={priceListState.batteryState || ""}
                  type="Number"
                  min="0"
                  max="100"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
        )}

        <div className=" flex-col px-[18px]">
          <div className=" flex items-center w-full h-14 font-semibold ">
            애플케어 유무
          </div>

          <ul className="text-DD flex mt-1">
            {priceListState.careOX === "O" ? (
              <li className="mr-3 flex">
                <input
                  className="appearance-none peer"
                  type="radio"
                  id="careOX-O"
                  name="careOX"
                  value="O"
                  defaultChecked
                  onClick={onChangeHandler}
                />
                <label
                  className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                  htmlFor="careOX-O"
                >
                  O
                </label>
              </li>
            ) : (
              <li className="mr-3 flex">
                <input
                  className="appearance-none peer"
                  type="radio"
                  id="careOX-O"
                  name="careOX"
                  value="O"
                  onClick={onChangeHandler}
                />
                <label
                  className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                  htmlFor="careOX-O"
                >
                  O
                </label>
              </li>
            )}
            {priceListState.careOX === "X" ? (
              <li className="mr-3 flex">
                <input
                  className="appearance-none peer"
                  type="radio"
                  id="careOX-X"
                  name="careOX"
                  value="X"
                  defaultChecked
                  onClick={onChangeHandler}
                />
                <label
                  className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                  htmlFor="careOX-X"
                >
                  X
                </label>
              </li>
            ) : (
              <li className="mr-3 flex">
                <input
                  className="appearance-none peer"
                  type="radio"
                  id="careOX-X"
                  name="careOX"
                  value="X"
                  onClick={onChangeHandler}
                />
                <label
                  className="flex items-center h-[38px] px-5 rounded-3xl border-DD border-[1px] peer-checked:border-CC peer-checked:bg-CC peer-checked:text-CC peer-checked:bg-opacity-50"
                  htmlFor="careOX-X"
                >
                  X
                </label>
              </li>
            )}
          </ul>
        </div>

        {priceListState.careOX === "O" && (
          <div>
            <div className=" flex-col px-[18px]">
              <div className=" flex items-center w-full h-14 font-semibold ">
                애플케어 보증기간
              </div>
              <div className="  mt-1 text-DD">
                <input
                  className=" h-[38px] px-3 rounded-3xl border-[1px] border-DD "
                  placeholder="애플케어 보증기간"
                  type="date"
                  name="careDate"
                  onChange={onChangeHandler}
                  defaultValue={priceListState.careDate}
                />
                <div className="h-28" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center fixed w-full bottom-14 p-5 ">
        <PricingStep stepState={stepState} />
      </div>
      <button
        className=" fixed bottom-0 w-full h-14 text-white bg-CC"
        onClick={onSubmitHandler}
      >
        가격책정
      </button>
    </div>
  );
};

export default PricingInput5;
