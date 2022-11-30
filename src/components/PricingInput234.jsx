import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import PricingStep from "./PricingStep";

const PricingInput234 = ({ params, stepState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { priceLists } = useSelector((state) => state.price);
  //경우에 따른 초기값으로 현상태 스테이트 초기화
  let initialState = {};
  let valueState = "";
  if (stepState === 2) {
    valueState = "years";
    // initialState = {
    //   category: priceLists.category,
    //   years: 0,
    //   model: "",
    //   options: "",
    //   batteryState: 0,
    //   careOX: "",
    //   careDate: "",
    //   iphoneState: "",
    //   macbookState: "",
    //   ram: "",
    //   storage: "",
    //   keyboard: "",
    // };
  } else if (stepState === 3) {
    valueState = "model";
    // initialState = {
    //   category: priceLists.category,
    //   years: priceLists.years,
    //   model: "",
    //   options: "",
    //   batteryState: 0,
    //   careOX: "",
    //   careDate: "",
    //   iphoneState: "",
    //   macbookState: "",
    //   ram: "",
    //   storage: "",
    //   keyboard: "",
    // };
  } else if (stepState === 4) {
    valueState = "options";
    // initialState = {
    //   category: priceLists.category,
    //   years: priceLists.years,
    //   model: priceLists.model,
    //   options: "",
    //   batteryState: 0,
    //   careOX: "",
    //   careDate: "",
    //   iphoneState: "",
    //   macbookState: "",
    //   ram: "",
    //   storage: "",
    //   keyboard: "",
    // };
  }

  const [tag, setTag] = useState(priceLists);
  const [getInfo, setGetInfo] = useState("");

  const { getList } = useSelector((state) => state.price);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
    console.log("tag값", tag);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    //벨리데이션 나중에 걸기
    // //컨펌 후 다음 리스트 받아오기, 해당페이지로 이동
    // if (window.confirm(`${tag.category} 맞습니까?`)) {
    //   if (tag.category === " " || tag.category === "category") {
    //     return alert("항목을 확인하세요");
    //   }
    //   dispatch(__getPriceInfo(getInfo));

    //   navigate(`/pricingPage/${getInfo}`);
    // }

    dispatch(__getPriceInfo(getInfo));
    navigate(`/pricingPage/${getInfo.API}`);
  };

  //서브밋 함수에 사용할 매개변수 설정
  useEffect(() => {
    if (stepState === 1) {
      setGetInfo({
        stepState: 2,
        API: `${priceLists.category}`,
        priceLists: tag,
        BackGetAPI: "",
        BackNaviAPI: "",
      });
    } else if (stepState === 2) {
      setGetInfo({
        stepState: 3,
        API: `${priceLists.category}/${tag.years}`,
        priceLists: tag,
        BackGetAPI: "",
        BackNaviAPI: `${priceLists.category}`,
      });
    } else if (stepState === 3) {
      setGetInfo({
        stepState: 4,
        API: `${priceLists.category}/${priceLists.years}/${tag.model}`,
        priceLists: tag,
        BackGetAPI: `${priceLists.category}`,
        BackNaviAPI: `${priceLists.category}/${priceLists.years}`,
      });
    } else if (stepState === 4) {
      if (priceLists.category === "iphone") {
        setGetInfo({
          stepState: 5,
          API: `${priceLists.category}/${priceLists.years}/${priceLists.model}`,
          priceLists: tag,
          Backapi: `${priceLists.category}/${priceLists.years}`,
          BackNaviAPI: `${priceLists.category}/${priceLists.years}/${priceLists.model}`,
        });
      } else {
        setGetInfo({
          stepState: 5,
          API: `${priceLists.category}/${priceLists.years}/${priceLists.model}/${tag.options}`,
          BackGetAPI: `${priceLists.category}/${priceLists.years}`,
          priceLists: tag,
          BackNaviAPI: `${priceLists.category}/${priceLists.years}/${priceLists.model}`,
        });
      }
    }

    // console.log("겟프라이스인포", getInfo);
  }, [tag]);

  // //새로고침을 위한 get
  // useEffect(() => {
  //   __getPriceInfo(getListState);
  // }, [dispatch]);

  return (
    <>
      {stepState === 2 && <ContentDiv>출시년도</ContentDiv>}
      {stepState === 3 && <ContentDiv>기종</ContentDiv>}
      {stepState === 4 && <ContentDiv>옵션</ContentDiv>}

      <CategoryDiv>
        <SelectBox name={valueState} onChange={onChangeHandler}>
          <option value={valueState}>{valueState}</option>
          {getList &&
            getList.map((list, index) => {
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

export default PricingInput234;

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
