import React from "react";

const PricingDetailList = ({ DetailPrice }) => {
  return (
    <>
      <div className=" font-semibold p-[18px] mt-5">
        <div>가격 책정 완료</div>
        {DetailPrice.getPrice && (
          <div className="text-CC text-3xl ">
            {DetailPrice.getPrice.toLocaleString("ko-KR")}원
          </div>
        )}
      </div>
      <div className="p-[18px]">
        {DetailPrice.category === "macbook" ? (
          <div className="bg-white p-4 rounded-md shadow-lg ">
            <div className=" bg-white flex-col rounded-md font-semibold">
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">카테고리</span>
                <label>{DetailPrice.category}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">출시년도</span>
                <label>{DetailPrice.years}년</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">기종</span>
                <label>{DetailPrice.model}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">화면크기</span>
                <label>{DetailPrice.options}인치</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">배터리 사이클</span>
                <label>{DetailPrice.batteryState}회</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">키보드 형태</span>
                <label>{DetailPrice.keyboard}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">램 메모리</span>
                <label>{DetailPrice.ram}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">SSD 용량</span>
                <label>{DetailPrice.storage}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">맥북 상태</span>
                <label>{DetailPrice.state}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">애플케어 유무</span>
                <label>{DetailPrice.careOX}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">애플케어 보증기간</span>
                <label>{DetailPrice.careDate}</label>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md shadow-lg">
            <div className="flex-col rounded-md font-semibold">
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">카테고리</span>
                <label>{DetailPrice.category}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">출시년도</span>
                <label>{DetailPrice.years}년</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">기종</span>
                <label>{DetailPrice.model}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">용량</span>
                <label>{DetailPrice.options}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">배터리 최대 용량</span>
                <label>{DetailPrice.batteryState}%</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">아이폰 상태</span>
                <label>{DetailPrice.state}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">애플케어 유무</span>
                <label>{DetailPrice.careOX}</label>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-OO font-medium">애플케어 보증기간</span>
                <label>{DetailPrice.careDate}</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PricingDetailList;
