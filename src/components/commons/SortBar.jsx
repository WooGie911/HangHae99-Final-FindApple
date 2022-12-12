import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swapoutline from "../../assets/swapoutline.png";

const SortBar = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  // 정렬 modal창 토글
  const [editTg, setEidtTg] = useState({
    isEdit: false,
  });
  const editToggleHandler = () => {
    const newEdit = {
      isEdit: !editTg.isEdit,
    };
    setEidtTg(newEdit);
  };

  //정렬순 이동 및 get 을 위한 state 변경
  const onClickSortHandler = (data) => {
    navigate(`${props.Navigate}/${params.category}/${data}`);
  };

  return (
    <div className="bg-white border-b-[3px] border-D9 h-10 font-semibold text-xs flex justify-between px-[18px] items-center">
      <div className="h-[14px]">전체 {props.postsCount}개</div>
      {params.sort === props.postId ? (
        <div
          className="flex cursor-pointer"
          onClick={() => {
            editToggleHandler();
          }}
        >
          <img src={swapoutline} />
          최신순
        </div>
      ) : (
        <div
          className="flex cursor-pointer"
          onClick={() => {
            editToggleHandler();
          }}
        >
          <img src={swapoutline} />
          인기순
        </div>
      )}
      {editTg.isEdit === true && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 z-20 w-full h-full flex justify-center items-center font-semibold"
          onClick={editToggleHandler}
        >
          <div className=" absolute bottom-0  z-30 w-full max-w-[375px] flex-col">
            <div
              className="hover:bg-CC hover:text-white cursor-pointer bg-white w-full h-14 rounded-t-3xl flex justify-center items-center"
              onClick={() => {
                onClickSortHandler(props.postLikeCnt);
              }}
            >
              인기순
            </div>

            <div
              className="hover:bg-CC hover:text-white cursor-pointer bg-white w-full h-14 mb-2 flex justify-center items-center"
              onClick={() => {
                onClickSortHandler(props.postId);
              }}
            >
              최신순
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortBar;
