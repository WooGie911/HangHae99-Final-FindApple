import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        <span
          onClick={() => {
            onClickSortHandler(props.postId);
          }}
        >
          인기순
        </span>
        <> </>
        <span
          onClick={() => {
            onClickSortHandler(props.postLikeCnt);
          }}
        >
          최신순
        </span>
      </div>
    </>
  );
};

export default SortBar;
