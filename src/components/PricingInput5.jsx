import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import PriceStep5 from "../assets/PriceStep5.svg";

const PricingInput5 = ({ priceListState, setPriceListState }) => {
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
    <>
      <div>
        <div>
          {priceListState.category === "macbook" ? (
            <div>
              <ContentDiv>램 메모리</ContentDiv>
              <CategoryDiv>
                <SelectBox
                  defaultValue={priceListState.ram}
                  name="ram"
                  onChange={onChangeHandler}
                >
                  <option value={"ram"}> ram </option>
                  {getList5.ram &&
                    getList5.ram.map((list, index) => {
                      return (
                        <option key={index} value={list}>
                          {" "}
                          {list}{" "}
                        </option>
                      );
                    })}
                </SelectBox>
              </CategoryDiv>

              <ContentDiv>SSD 용량</ContentDiv>
              <CategoryDiv>
                <SelectBox
                  defaultValue={priceListState.storage}
                  name="storage"
                  onChange={onChangeHandler}
                >
                  <option value={"storage"}>SSD 용량</option>
                  {getList5.storage &&
                    getList5.storage.map((list, index) => {
                      return (
                        <option key={index} value={list}>
                          {" "}
                          {list}{" "}
                        </option>
                      );
                    })}
                </SelectBox>
              </CategoryDiv>
              <ContentDiv>배터리 사이클</ContentDiv>
              <CategoryDiv>
                <PriceInput
                  placeholder="배터리 사이클을 입력해주세요"
                  value={priceListState.batteryState || ""}
                  type="Number"
                  min="0"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
              <ContentDiv>맥북 상태</ContentDiv>
              <CategoryDiv>
                <SelectBox
                  defaultValue={priceListState.macbookState}
                  name="macbookState"
                  onChange={onChangeHandler}
                >
                  <option value={"macbookState"}>맥북 상태</option>
                  <option value={"Class A"}>A급</option>
                  <option value={"Class B"}>B급</option>
                  <option value={"Class C"}>C급</option>
                </SelectBox>
              </CategoryDiv>
            </div>
          ) : (
            <div>
              <ContentDiv>아이폰 상태</ContentDiv>
              <CategoryDiv>
                <SelectBox
                  defaultValue={priceListState.iphoneState}
                  name="iphoneState"
                  onChange={onChangeHandler}
                >
                  <option value={"iphoneState"}>아이폰 상태</option>
                  <option value={"Class A"}>A급</option>
                  <option value={"Class B"}>B급</option>
                  <option value={"Class C"}>C급</option>
                </SelectBox>
              </CategoryDiv>
              <ContentDiv>배터리 성능 최대치</ContentDiv>
              <CategoryDiv>
                <PriceInput
                  placeholder="0% ~ 100%"
                  value={priceListState.batteryState || ""}
                  type="Number"
                  min="0"
                  max="100"
                  name="batteryState"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
            </div>
          )}

          <ContentDiv>애플케어 유무</ContentDiv>
          <CategoryDiv>
            <SelectBox
              defaultValue={priceListState.careOX}
              name="careOX"
              onChange={onChangeHandler}
            >
              <option value={"careOX"}>애플케어 유무</option>
              <option value={"O"}>있음</option>
              <option value={"X"}>없음</option>
            </SelectBox>
          </CategoryDiv>

          {priceListState.careOX === "O" && (
            <>
              <ContentDiv>애플케어 보증기간</ContentDiv>
              <CategoryDiv>
                <DateInput
                  placeholder="애플케어 보증기간"
                  type="date"
                  name="careDate"
                  onChange={onChangeHandler}
                />
              </CategoryDiv>
            </>
          )}
        </div>

        <DDid />

        <StepDiv>
          <img src={PriceStep5} />
        </StepDiv>

        <NextButton onClick={onSubmitHandler}>다음으로</NextButton>
      </div>
    </>
  );
};

export default PricingInput5;

const RLDiv = styled.div`
  .C02:checked {
    .C01 {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  position: relative;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 10px;
  padding-left: 10px;
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const SelectBox = styled.select`
  width: 330px;
  height: 40px;
  overflow: auto;
  border: 1px solid #000000;
  background-color: transparent;
  border-radius: 50px;
  font-size: 15px;
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

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 50px;
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

const DDid = styled.div`
  height: 100px;
`;

const StepDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 56px;
  border: none;
  background-color: transparent;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 56px;
  color: white;
  border: none;
  background-color: #4f75ff;
`;
