import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blackHome from "../../assets/blackHome.png";
import blueHome from "../../assets/blueHome.png";
import blackSearch from "../../assets/blackSearch.svg";
import blueSearch from "../../assets/blueSearch.svg";
import bluePlus from "../../assets/bluePlus.svg";
import blackIssue from "../../assets/blackIssue.svg";
import blueIssue from "../../assets/blueIssue.svg";
import blackMy from "../../assets/blackMy.svg";
import blueMy from "../../assets/blueMy.svg";
import { useDispatch, useSelector } from "react-redux";
import { swichStepState } from "../../redux/modules/PriceSlice";
import whiteChat from "../../assets/whiteChat.png";
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
    dispatch(swichFooterState(data.state));
    navigate(`${data.navi}`);
  };

  useEffect(() => {}, [footerState]);

  return (
    <div className="fixed bottom-0 ">
      <div className="px-[18px] absolute right-0 bottom-[70px]">
        <button
          className=" w-12 h-12 bg-CC flex relative items-center justify-center rounded-full"
          onClick={popupPostCode}
        >
          <img src={whiteChat} />
        </button>
        {isChatModal && (
          <div
            className="fixed top-0 left-0 bg-black bg-opacity-50 z-50 w-full h-full flex justify-center items-center"
            onClick={popupPostCode}
          >
            <ChatList />
          </div>
        )}
      </div>

      <div className="bg-white w-[375px] max-w-full h-[58px] flex justify-between px-[18px] text-[10px] font-semibold items-center">
        {footerState !== "Home" ? (
          <div
            className="cursor-pointer flex-1"
            onClick={() => onClickHandler({ state: "Home", navi: "/main" })}
          >
            <div className="flex justify-center">
              <img className="h-8 w-8" src={blackHome} />
            </div>
            <div className="text-center">홈</div>
          </div>
        ) : (
          <div
            className="cursor-pointer flex-1"
            onClick={() => onClickHandler({ state: "Home", navi: "/main" })}
          >
            <div className="flex justify-center">
              <img className="h-8 w-8" src={blueHome} />
            </div>
            <div className="text-CC text-center">홈</div>
          </div>
        )}

        {footerState !== "Search" ? (
          <div
            className="cursor-pointer flex-1"
            onClick={() =>
              onClickHandler({ state: "Search", navi: "/postread/all/postId" })
            }
          >
            <div className="flex justify-center">
              <img className="h-8 w-8" src={blackSearch} />
            </div>
            <div className="text-center">검색</div>
          </div>
        ) : (
          <div
            className="cursor-pointer flex-1"
            onClick={() =>
              onClickHandler({ state: "Search", navi: "/postread/all/postId" })
            }
          >
            <div className="flex justify-center">
              <img className="h-8 w-8" src={blueSearch} />
            </div>
            <div className="text-CC text-center">검색</div>
          </div>
        )}

        <img
          className=" cursor-pointer  rounded-full flex-1"
          src={bluePlus}
          onClick={() => onClickPricingButton()}
        />

        {footerState !== "Issue" ? (
          <div
            className="cursor-pointer flex-1"
            onClick={() =>
              onClickHandler({
                state: "Issue",
                navi: "/objectionread/all/issuesId",
              })
            }
          >
            <div className="flex justify-center">
              <img className=" ml-1  h-8 w-8" src={blackIssue} />
            </div>
            <div className="text-center"> 이의제기 </div>
          </div>
        ) : (
          <div
            className="cursor-pointer flex-1"
            onClick={() =>
              onClickHandler({
                state: "Issue",
                navi: "/objectionread/all/issuesId",
              })
            }
          >
            <div className="flex justify-center">
              <img className=" ml-1  h-8 w-8" src={blueIssue} />
            </div>
            <div className=" text-CC text-center"> 이의제기 </div>
          </div>
        )}

        {footerState !== "My" ? (
          <div
            className="cursor-pointer flex-1"
            onClick={() => onClickHandler({ state: "My", navi: "/mypage" })}
          >
            <div className="flex justify-center">
              <img className="h-8 w-8" src={blackMy} />
            </div>
            <div className="text-center ">내 정보</div>
          </div>
        ) : (
          <div
            className="cursor-pointer flex-1"
            onClick={() => onClickHandler({ state: "My", navi: "/mypage" })}
          >
            <div className="flex justify-center">
              <img className="h-8 w-8 " src={blueMy} />
            </div>
            <div className="text-CC text-center ">내 정보</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
