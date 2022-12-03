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
    <div className="bg-CC w-full h-[49px] text-translucent5 ">
      <div className=" text-[14px] flex flex-row justify-between h-[45px] items-center">
        <div
          className="text-white w-1/4 cursor-pointer text-center"
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
        <div className="w-1/4 bg-translucent5" />
        <div className="w-1/4" />
        <div className="w-1/4 " />
        <div className="w-1/4 " />
      </div>
    </div>
  );
};

export default MainHeader;
