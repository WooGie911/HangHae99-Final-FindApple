import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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

    console.log(priceListState);
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
    <>
      <ContentDiv>출시년도를 선택해주세요</ContentDiv>

      <CategoryDiv>
        <SelectBox
          defaultValue={priceListState.years}
          name={"years"}
          onChange={onChangeHandler}
        >
          <option value={0}>years</option>
          {getList2 &&
            getList2.map((list, index) => {
              return (
                <option key={index} value={list}>
                  {list}
                </option>
              );
            })}
        </SelectBox>
      </CategoryDiv>

      <StepDiv>
        <PricingStep stepState={stepState} />
      </StepDiv>
      <NextButton onClick={onSubmitHandler}>다음으로</NextButton>
    </>
  );
};

export default PricingInput2;

const RLDiv = styled.div`
  .C02:checked {
    .C01 {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;
const RadioInput = styled.input`
  /* appearance: none; */
  &:checked {
    ${RLDiv} {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;

const RadioLabel = styled.label`
  width: 100px;
  height: 35px;
  overflow: auto;
  border: 1px solid #4f75ff;
  border-radius: 50px;
  font-size: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${RadioInput}:checked {
    border: 1px solid #949497;
    background-color: #4f75ff;
    color: #ff0000;
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
