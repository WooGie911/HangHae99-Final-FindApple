import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [headerBarState, setHeaderBarState] = useState("all");
  //카테고리별 이동 및 get 을 위한 state 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    props.setState({
      ...props.state,
      paramObj: paramObj,
      postSort: params.sort,
    });
    setHeaderBarState(data);
    navigate(`${props.Navigate}/${data}/${params.sort}`);
  };

  return (
    <div className="bg-CC w-full h-[49px] text-translucent ">
      <div className=" text-[14px] flex flex-row justify-between h-[45px] items-center">
        <div
          className=" w-1/4 cursor-pointer text-center"
          onClick={() => {
            navigate("/main");
          }}
        >
          HOME
        </div>

        {headerBarState === "all" ? (
          <div
            className="text-white w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </div>
        ) : (
          <div
            className=" w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </div>
        )}
        {headerBarState === "macbook" ? (
          <div
            className="text-white w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </div>
        ) : (
          <div
            className=" w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </div>
        )}
        {headerBarState === "iphone" ? (
          <div
            className="text-white w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </div>
        ) : (
          <div
            className=" w-1/4 cursor-pointer text-center"
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </div>
        )}
      </div>

      {headerBarState === "all" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 bg-translucent" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      ) : headerBarState === "macbook" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-translucent" />
          <div className="w-1/4 " />
        </div>
      ) : headerBarState === "iphone" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-translucent" />
        </div>
      ) : (
        <div className="h-1 flex  ">
          <div className="w-1/4 bg-translucent" />
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      )}
    </div>
  );
};

export default Header;
