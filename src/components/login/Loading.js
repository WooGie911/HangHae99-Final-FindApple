import React from "react";
import Spinner from "../elements/Spinner.gif";

//이 컴포넌트의 목적은 로딩 시, 사용자에게 빈 화면을 보여주지 않고
//스피너를 통해 로딩 중이라는 것을 보여주기 위한 목적.

export default () => {
  return (
    <div className=" absolute w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="flex-col">
        <div className="flex justify-center">잠시만 기다려 주세요.</div>
        <div className="flex justify-center">
          <img className="w-1/5" src={Spinner} alt="로딩중" />
        </div>
      </div>
    </div>
  );
};
