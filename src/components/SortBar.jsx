import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swapoutline from "../assets/swapoutline.png"
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
    <>
      <div>
        <StContainer>
        <Total>전체{props.postsCount}개</Total>
        {params.sort === props.postId ? (<Sort
          onClick={() => {
            onClickSortHandler(props.postLikeCnt);
          }}
        >
          <img src={swapoutline}/>최신순
        </Sort> ) : (<Sort
        onClick={() => {
          onClickSortHandler(props.postId);
        }}
      >
        <img src={swapoutline}/>인기순
      </Sort>
          
        )}
        </StContainer>
      </div>
    </>
  );
};

export default SortBar;

// 소트바
const StContainer=styled.div`
display: flex;
justify-content: space-between;
padding: 10px;
`

// 글자크기
const Total=styled.div`
font-size : 12px;
img {
  width: 12px;
  height: 12px;
}
`

const Sort=styled.div`
font-size : 12px;
img {
  width: 12px;
  height: 12px;
}
`