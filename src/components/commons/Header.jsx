import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { swichFooterState } from "../../redux/modules/PostsSlice";

const Header = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [headerBarState, setHeaderBarState] = useState(params.category);
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
  const onClickHomeHandler = () => {
    dispatch(swichFooterState("Home"));
    navigate("/main");
  };

  return (
    <div className="bg-CC w-full h-[49px] text-translucent5 ">
      <div className=" text-[14px] flex flex-row justify-between h-[45px] items-center">
        <div
          className=" w-1/4 cursor-pointer text-center"
          onClick={() => {
            onClickHomeHandler();
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
          <div className="w-1/4 bg-translucent5" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      ) : headerBarState === "macbook" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-translucent5" />
          <div className="w-1/4 " />
        </div>
      ) : headerBarState === "iphone" ? (
        <div className="h-1 flex  ">
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
          <div className="w-1/4 bg-translucent5" />
        </div>
      ) : (
        <div className="h-1 flex  ">
          <div className="w-1/4 bg-translucent5" />
          <div className="w-1/4" />
          <div className="w-1/4 " />
          <div className="w-1/4 " />
        </div>
      )}
    </div>
  );
};

export default Header;
