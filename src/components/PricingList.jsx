import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PricingList = ({ DetailPrice }) => {
  console.log("DetailPrice", DetailPrice);
  const navigate = useNavigate();

  const checkReally = (data) => {
    if (window.confirm("이동하시겠습니까?")) {
      navigate(data);
    }
    console.log("DetailPrice", DetailPrice);
  };
  return (
    <>
    
      {DetailPrice.category === "macbook" ? (
        <div>
          <div>
          <FinalText>가격 책정 완료</FinalText>
          <FinalPrice>{DetailPrice.getPrice}원</FinalPrice>
          </div>
          <StContainer>

          <label>카테고리 : {DetailPrice.category}</label>
          <br />
          <label>출시년도 : {DetailPrice.year}</label>
          <br />
          <label>기종 : {DetailPrice.model}</label>
          <br />
          <label>화면크기 : {DetailPrice.option}</label>
          <br />
          <label>배터리 사이클 : {DetailPrice.batteryState}</label>
          <br />
          <label>키보드 형태: : {DetailPrice.keyboard}</label>
          <br />
          <label>램 : {DetailPrice.ram}</label>
          <br />
          <label>SSD용량 배열: {DetailPrice.storage}</label>
          <br />
          <label>맥북 상태 : {DetailPrice.macbookState}</label>
          <br />
          <label>애플케어 유무 : {DetailPrice.careOX}</label>
          <br />
          <label>애플케어 보증기간 : {DetailPrice.careDate}</label>
          <br />
          <br />
          <br />
          </StContainer>
        </div>
      ) : (
        <div>
          <div>
          <FinalText>가격 책정 완료</FinalText>
          <FinalPrice>{DetailPrice.getPrice}원</FinalPrice>
          </div>
          <StContainer>

          <label>카테고리 : {DetailPrice.category}</label>
          <br />
          <label>출시년도 : {DetailPrice.year}</label>
          <br />
          <label>기종 : {DetailPrice.model}</label>
          <br />
          <label>화면크기 : {DetailPrice.option}</label>
          <br />
          <label>배터리효율 : {DetailPrice.batteryState}</label>
          <br />
          <label>아이폰상태 : {DetailPrice.iphoneState}</label>
          <br />
          <label>애플케어 유무 : {DetailPrice.careOX}</label>
          <br />
          <label>애플케어 보증기간 : {DetailPrice.careDate}</label>
          <br />
          <br />
          <br />
          </StContainer>
        </div>
      )}
          <InputButton
            onClick={() => {
              checkReally(`/postcreate`);
            }}
          >
            상품 등록
          </InputButton>
          <ObjectionButton
            onClick={() => {
              checkReally(`/objectioncreate`);
            }}
          >
            이의 제기
          </ObjectionButton>

    </>
  );
};

export default PricingList;

// 전체 틀
const StContainer=styled.div`
margin : auto;
width: 341px;
height: 429px;
background-color: gray;
border-radius: 5px;
color : #C4C4C4;
label {
  padding : 10px;
}
`

// 최종가격
const FinalText=styled.div`
font-size : 16px;
`

const FinalPrice=styled.div`
font-size: 28px;
color: #3D6AF2;
`

// 버튼

const InputButton=styled.button`
background-color: #3D6AF2;
color: white;
position: absolute;
width: 168px;
height: 54px;
left: 14px;
top: 834px;

`

const ObjectionButton=styled.button`
background-color: #3D6AF2;
color: white;
position: absolute;
width: 168px;
height: 54px;
left: 191px;
top: 834px;

`