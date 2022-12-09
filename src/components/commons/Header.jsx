import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { swichFooterState } from "../../redux/modules/PostsSlice";

const Header = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  //카테고리별 이동 및 get 을 위한 state 변경
  const onClickCategoryHandler = (data) => {
    navigate(`${props.Navigate}/${data}/${params.sort}`);
  };
  const onClickHomeHandler = () => {
    dispatch(swichFooterState("Home"));
    navigate("/main");
  };

  return (
    <div className="bg-white w-full h-[49px] text-translucent5 border-t-[0.5px] border-b-[1px] border-D9">
      <div className="text-CC text-opacity-50 font-semibold text-[14px] flex flex-row justify-between h-[45px] items-center">
        <div
          className=" w-1/4 cursor-pointer text-center"
          onClick={() => {
            onClickHomeHandler();
          }}
        >
          HOME
        </div>

        {params.category === "all" ? (
          <div
            className="bg-F6 h-full items-center flex justify-center text-CC text-opacity-100 w-1/4 cursor-pointer text-center bg"
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
        {params.category === "macbook" ? (
          <div
            className="bg-F6 h-full items-center flex justify-center text-CC text-opacity-100 w-1/4 cursor-pointer text-center bg"
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
        {params.category === "iphone" ? (
          <div
            className="bg-F6 h-full items-center flex justify-center text-CC text-opacity-100 w-1/4 cursor-pointer text-center bg"
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

      {params.category === "all" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 bg-CC" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      ) : params.category === "macbook" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-CC" />
          <div className="w-1/4 " />
        </div>
      ) : params.category === "iphone" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-CC" />
        </div>
      ) : (
        <div className="h-1 flex  ">
          <div className="w-1/4 bg-CC" />
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      )}
    </div>
  );
};

export default Header;
