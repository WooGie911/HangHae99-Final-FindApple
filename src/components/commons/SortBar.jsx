import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swapoutline from "../../assets/swapoutline.png";
const SortBar = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  //정렬순 이동 및 get 을 위한 state 변경
  const onClickSortHandler = (data) => {
    const paramObj =
      params.category === "all"
        ? params.category
        : `category/${params.category}`;

    props.setState({
      ...props.state,
      paramObj: paramObj,
      postSort: data,
    });
    navigate(`${props.Navigate}/${params.category}/${data}`);
  };

  return (
    <div className="bg-white border-b-[3px] border-D9 h-10 font-semibold text-xs flex justify-between px-[18px] items-center">
      <div className="h-[14px]">전체 {props.postsCount}개</div>
      {params.sort === props.postId ? (
        <div
          className="flex cursor-pointer"
          onClick={() => {
            onClickSortHandler(props.postLikeCnt);
          }}
        >
          <img src={swapoutline} />
          최신순
        </div>
      ) : (
        <div
          className="flex cursor-pointer"
          onClick={() => {
            onClickSortHandler(props.postId);
          }}
        >
          <img src={swapoutline} />
          인기순
        </div>
      )}
    </div>
  );
};

export default SortBar;
