import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import blackHome from "../../assets/blackHome.svg";
import blueHome from "../../assets/blueHome.svg";
import blackSearch from "../../assets/blackSearch.svg";
import blueSearch from "../../assets/blueSearch.svg";
import bluePlus from "../../assets/bluePlus.svg";
import blackIssue from "../../assets/blackIssue.svg";
import blueIssue from "../../assets/blueIssue.svg";
import blackMy from "../../assets/blackMy.svg";
import blueMy from "../../assets/blueMy.svg";
import { useDispatch, useSelector } from "react-redux";
import { swichStepState } from "../../redux/modules/PriceSlice";
import chat from "../../assets/chat.png";
import ChatList from "../../pages/chatting/element/ChatList";
import { swichFooterState } from "../../redux/modules/PostsSlice";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { footerState } = useSelector((state) => state.posts);

  const onClickPricingButton = () => {
    //가격책정 스토어 초기화
    dispatch(
      swichStepState({
        stepState: 1,
        priceLists: {
          category: "",
          years: 0,
          model: "",
          options: "",
          batteryState: 0,
          careOX: "",
          careDate: "",
          iphoneState: "",
          macbookState: "",
          ram: "",
          storage: "",
          keyboard: "",
        },
      })
    );
    //가격책정 페이지로 이동
    navigate("/pricingPage");
  };

  // 채팅 modal창 상태 관리
  const [isChatModal, setIsChatModal] = useState(false);
  const popupPostCode = () => {
    setIsChatModal(!isChatModal);
  };

  const onClickHandler = (data) => {
    console.log("footerState", footerState);
    dispatch(swichFooterState(data.state));
    navigate(`${data.navi}`);
  };

  useEffect(() => {
    console.log("footerState", footerState);
  }, [footerState]);
  return (
    <div className="fixed bottom-0">
      <div className=" absolute right-0 bottom-[70px]">
        <button
          className="w-[79px] h-[45px] bg-CC flex relative items-center justify-center rounded-3xl"
          onClick={popupPostCode}
        >
          <img src={chat} />
          <div className="ml-2 text-xs ">채팅</div>
        </button>
        {isChatModal && (
          <ModalWrap onClick={popupPostCode}>
            <ChatList />
          </ModalWrap>
        )}
      </div>

      <div className="bg-white w-[375px] max-w-full h-[58px] flex justify-between px-[18px] text-[10px] font-semibold items-center">
        {footerState !== "Home" ? (
          <div onClick={() => onClickHandler({ state: "Home", navi: "/main" })}>
            <img className="h-8 w-8" src={blackHome} />

            <div className="text-center">홈</div>
          </div>
        ) : (
          <div onClick={() => onClickHandler({ state: "Home", navi: "/main" })}>
            <img className="h-8 w-8" src={blueHome} />

            <div className="text-CC text-center">홈</div>
          </div>
        )}

        {footerState !== "Search" ? (
          <div
            onClick={() =>
              onClickHandler({ state: "Search", navi: "/postread/all/postId" })
            }
          >
            <img className="h-8 w-8" src={blackSearch} />
            <div className="text-center">검색</div>
          </div>
        ) : (
          <div
            onClick={() =>
              onClickHandler({ state: "Search", navi: "/postread/all/postId" })
            }
          >
            <img className="h-8 w-8" src={blueSearch} />
            <div className="text-CC text-center">검색</div>
          </div>
        )}

        <img
          className=" cursor-pointer  rounded-full"
          src={bluePlus}
          onClick={() => onClickPricingButton()}
        />
        {footerState !== "Issue" ? (
          <div
            onClick={() =>
              onClickHandler({
                state: "Issue",
                navi: "/objectionread/all/issuesId",
              })
            }
          >
            <img className=" ml-1  h-8 w-8" src={blackIssue} />

            <div className="text-center"> 이의제기 </div>
          </div>
        ) : (
          <div
            onClick={() =>
              onClickHandler({
                state: "Issue",
                navi: "/objectionread/all/issuesId",
              })
            }
          >
            <img className=" ml-1  h-8 w-8" src={blueIssue} />

            <div className=" text-CC text-center"> 이의제기 </div>
          </div>
        )}
        {footerState !== "My" ? (
          <div onClick={() => onClickHandler({ state: "My", navi: "/mypage" })}>
            <img className="h-8 w-8" src={blackMy} />
            <div className="text-center ">내 정보</div>
          </div>
        ) : (
          <div onClick={() => onClickHandler({ state: "My", navi: "/mypage" })}>
            <img className="h-8 w-8" src={blueMy} />
            <div className="text-CC text-center ">내 정보</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;

// modal 닫기
const ModalWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  padding: 0 15px;
  box-sizing: border-box;
`;
