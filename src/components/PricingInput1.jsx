import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput1 = ({ params, stepState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    category: "",
    years: 0,
    model: "",
    options: "",
    batteryState: 0,
    careOX: "",
    careDate: "",
    iphoneState: "",
    macbookState: "",
    ram: "",
    storage: "",
    keyboard: "",
  };
  const [tag, setTag] = useState(initialState);
  const [getInfo, setGetInfo] = useState("");

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    console.log("getInfo", getInfo);
    e.preventDefault();

    if (tag.category === " " || tag.category === "category") {
      return alert("항목을 확인하세요");
    }
    //다음 리스트 받아오기
    dispatch(__getPriceInfo(getInfo));
    //
    navigate(`/pricingPage/${getInfo.API}`);
  };

  //서브밋 함수에 사용할 매개변수 설정
  useEffect(() => {
    setGetInfo({
      stepState: 2,
      API: `${tag.category}`,
      priceLists: tag,
      BackGetAPI: "",
    });
    console.log("겟프라이스인포", getInfo);
  }, [tag]);

  return (
    <>
      <ContentDiv>카테고리를 선택해주세요</ContentDiv>

      <CategoryDiv>
        <SelectBox type="radio" name="category" onChange={onChangeHandler}>
          <option value={"category"}>Category</option>
          <option value={"macbook"}>macbook</option>
          <option value={"iphone"}>iphone</option>
        </SelectBox>
      </CategoryDiv>

      <StepDiv>
        <PricingStep stepState={stepState} />
      </StepDiv>
      <NextButton onClick={onSubmitHandler}>다음으로</NextButton>
    </>
  );
};

export default PricingInput1;

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

const SelectBox = styled.select`
  width: 330px;
  height: 40px;
  overflow: auto;
  border: 1px solid #000000;
  background-color: transparent;
  border-radius: 50px;
  font-size: 15px;
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
