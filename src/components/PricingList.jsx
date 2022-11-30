import React from "react";
import styled from "styled-components";
const PricingList = ({ DetailPrice }) => {
  return (
    <>
      <TopDiv>
        <TitleDiv>가격 책정 완료</TitleDiv>
        {DetailPrice.getPrice && (
          <ContentDiv>
            {/* {DetailPrice.getPrice.toLocaleString("ko-KR")}원 */}
            {DetailPrice.getPrice}원
          </ContentDiv>
        )}
      </TopDiv>
      {DetailPrice.category === "macbook" ? (
        <ListDiv>
          <div>
            <div>
              <span>카테고리</span>
              <label>{DetailPrice.category}</label>
            </div>
            <div>
              <span>출시년도</span>
              <label>{DetailPrice.years}년</label>
            </div>
            <div>
              <span>기종</span>
              <label>{DetailPrice.model}</label>
            </div>
            <div>
              <span>화면크기</span>
              <label>{DetailPrice.options}인치</label>
            </div>
            <div>
              <span>배터리 사이클</span>
              <label>{DetailPrice.batteryState}회</label>
            </div>
            <div>
              <span>키보드 형태</span>
              <label>{DetailPrice.keyboard}</label>
            </div>
            <div>
              <span>램 메모리</span>
              <label>{DetailPrice.ram}</label>
            </div>
            <div>
              <span>SSD 용량</span>
              <label>{DetailPrice.storage}</label>
            </div>
            <div>
              <span>맥북 상태</span>
              <label>{DetailPrice.macbookState}</label>
            </div>
            <div>
              <span>애플케어 유무</span>
              <label>{DetailPrice.careOX}</label>
            </div>
            <div>
              <span>애플케어 보증기간</span>
              <label>{DetailPrice.careDate}</label>
            </div>
          </div>
        </ListDiv>
      ) : (
        <ListDiv>
          <div>
            <div>
              <span>카테고리</span>
              <label>{DetailPrice.category}</label>
            </div>
            <div>
              <span>출시년도</span>
              <label>{DetailPrice.years}년</label>
            </div>
            <div>
              <span>기종</span>
              <label>{DetailPrice.model}</label>
            </div>
            <div>
              <span>용량</span>
              <label>{DetailPrice.options}</label>
            </div>
            <div>
              <span>배터리 사이클</span>
              <label>{DetailPrice.batteryState}%</label>
            </div>
            <div>
              <span>아이폰 상태</span>
              <label>{DetailPrice.iphoneState}</label>
            </div>
            <div>
              <span>애플케어 유무</span>
              <label>{DetailPrice.careOX}</label>
            </div>
            <div>
              <span>애플케어 보증기간</span>
              <label>{DetailPrice.careDate}</label>
            </div>
          </div>
        </ListDiv>
      )}
    </>
  );
};

export default PricingList;

const TopDiv = styled.div`
  position: relative;
  background-color: transparent;
`;
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-top: 5px;
  margin-left: 20px;
  width: 100%;
  height: 50px;
  /* background-color: transparent; */
  background-color: transparent;
`;
const ContentDiv = styled.div`
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 10px;
  margin-left: 20px;
  width: 100%;
  height: 50px;
  color: #3d6af2;
  background-color: transparent;
`;

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 20px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  div {
    height: 100%;
    div {
      padding: 2px 10px;
      height: 35px;
      background-color: transparent;

      span {
        color: #c4c4c4;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
      label {
        position: absolute;
        right: 20px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
`;
