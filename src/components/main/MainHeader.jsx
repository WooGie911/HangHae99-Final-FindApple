import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialHeaderState } from "../../redux/modules/PostsSlice";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //카테고리별 이동 및 get 을 위한 store 변경
  const onClickCategoryHandler = (data) => {
    const paramObj = data === "all" ? data : `category/${data}`;
    const initialObj = {
      paramObj: paramObj,
      pageNumber: 0,
      pageSize: 10,
      postSort: "postId",
    };
    dispatch(
      initialHeaderState({ HeaderState: initialObj, footerState: "Search" })
    );
    navigate(`${props.Navigate}/${data}/postId`);
  };

  return (
    <div className="bg-white w-full h-[49px] text-translucent5 border-t-[0.5px] border-b-[1px] border-D9 ">
      <div className="text-CC text-opacity-50 font-semibold text-[14px] flex flex-row justify-between h-[45px] items-center">
        <div
          className="text-CC text-opacity-100 w-1/4 cursor-pointer text-center"
          onClick={() => {
            navigate("/main");
          }}
        >
          HOME
        </div>
        <div
          className=" w-1/4 cursor-pointer text-center"
          onClick={() => {
            onClickCategoryHandler("all");
          }}
        >
          전체
        </div>
        <div
          className="w-1/4 cursor-pointer text-center "
          onClick={() => {
            onClickCategoryHandler("macbook");
          }}
        >
          MacBook
        </div>
        <div
          className="w-1/4 cursor-pointer text-center"
          onClick={() => {
            onClickCategoryHandler("iphone");
          }}
        >
          iPhone
        </div>
      </div>
      <div className="h-1 flex  ">
        <div className="w-1/4 bg-CC" />
        <div className="w-1/4" />
        <div className="w-1/4 " />
        <div className="w-1/4 " />
      </div>
    </div>
  );
};

export default MainHeader;
