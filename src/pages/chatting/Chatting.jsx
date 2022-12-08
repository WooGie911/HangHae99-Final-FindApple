import styled, { css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getinitialChatList,
  chatList,
} from "../../redux/modules/ChattingSlice";
import { v4 as uuidv4 } from "uuid";
import backArrow from "../../assets/backArrow.svg";
import { ReactComponent as Send } from "../../assets/send.svg";
import Layout2 from "../../components/commons/Layout2";

function Chatting() {
  const sock = new SockJS(`${process.env.REACT_APP_SERVER}/api/ws/chat`);
  const ws = webstomp.over(sock);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let roomId = Number(localStorage.getItem("roomId"));
  const listReducer = useSelector((state) => state.chatting.chatList);
  useEffect(() => {
    if (roomId !== undefined) {
      dispatch(
        __getinitialChatList({
          roomId: roomId,
        })
      );
      return () => {
        onbeforeunloda();
      };
    }
  }, [roomId]);

  useEffect(() => {
    wsConnectSubscribe();

    return () => {
      onbeforeunloda();
    };
  }, [roomId]);

  const [chatBody, setChatBody] = useState("");

  const content = {
    sender: listReducer.senderId,
    message: chatBody,
  };
  let headers = {
    Access_Token: localStorage.getItem("Access_Token"),
  };
  function wsConnectSubscribe() {
    try {
      ws.connect(headers, (frame) => {
        ws.subscribe(`/sub/${roomId}`, (response) => {
          let data = JSON.parse(response.body);
          dispatch(chatList(data));
        });
      });
    } catch (error) {}
  }

  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행

        if (ws.ws.readyState === 1) {
          callback();

          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }
  //stomp 메시지 에러 waitForConnection함수로 해결

  const onbeforeunloda = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
          clearTimeout(waitForConnection);
        },

        { Access_Token: localStorage.getItem("Access_Token") }
      );
    } catch (e) {}
  };

  const inputHandler = (e) => {
    setChatBody(e.target.value);
  };

  //onSubmitHandler
  const onSubmitHandler = () => {
    if (chatBody === "" || chatBody === " ") {
      return alert("내용을 입력해주세요.");
    }
    waitForConnection(ws, function () {
      ws.send(`/pub/${roomId}`, JSON.stringify(content), {
        Access_Token: localStorage.getItem("Access_Token"),
      });
    });
    setChatBody("");
  };
  const appKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
      setChatBody("");
    }
  };
  //enter시 메시지 보냄
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [listReducer]);
  //채팅창 치면 맨 밑으로 내려감.

  // 뒤로가기
  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <Layout2>
      <div className="flex-col h-full">
        <div className="  flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9 ">
          <img
            className="h-6 w-6 absolute left-3 cursor-pointer"
            onClick={onClickHandler}
            src={backArrow}
          />
          <div>{listReducer.otherNickname}</div>
        </div>
        <div className="  flex relative h-20 items-center font-medium border-b-[1px] border-D9 px-[18px] ">
          {listReducer.image !== undefined && (
            <img
              className="h-12 w-12 object-cover rounded-lg"
              src={listReducer.image.imgUrl}
            />
          )}
          <div className="	p-1.5 ml-1.5">
            <div>{listReducer.title}</div>
            <div>
              {listReducer.price !== undefined && (
                <>{listReducer.price.toLocaleString("ko-KR")}원</>
              )}
            </div>
          </div>
        </div>
        <div className="px-[18px]">
          {listReducer.chatList !== undefined &&
            listReducer.chatList !== null &&
            listReducer.chatList.map((item) => {
              return (
                <>
                  {listReducer.senderId === item.sender ? (
                    <div className=" flex justify-end" key={uuidv4()}>
                      {/* 인라인 요소로 바로 우측 정렬 해결 */}
                      <div className="flex items-end">
                        <span className="text-[10px] text-C4 text-opacity-50 ">
                          {item.sendDate}
                        </span>
                        <div className="text-white p-2 bg-CC rounded-t-3xl rounded-bl-3xl text-sm	mt-3">
                          {item.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={uuidv4()}>
                      <div className=" flex justify-start" key={uuidv4()}>
                        <div className="bg-D9 rounded-t-3xl rounded-br-3xl text-sm	mt-3">
                          {item.message}
                        </div>
                        <span className="text-[10px] text-C4 text-opacity-50 ">
                          {item.sendDate}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="h-16"></div>
        <div ref={scrollRef}></div>
      </div>
      <div className="w-[375px] fixed bottom-0">
        <div className="flex absolute bottom-0 w-full py-3 px-[18px] mx-auto">
          <input
            className="h-[38px] w-full rounded-3xl outline-none px-4 text-[14px] text-C4 border-DD border-[1px]"
            value={chatBody}
            onChange={inputHandler}
            onKeyPress={appKeyPress}
            placeholder="채팅을 입력하세요(20자 이내)"
            maxLength="20"
          />
          {/* value를 줘야 사라진다 */}
          <Send
            onClick={onSubmitHandler}
            style={{
              cursor: "pointer",
              position: "fixed",
              left: "calc(50% + 140px)",
              transform: "translateX(-50%)",
              bottom: 23,
            }}
          />
          {/* calc로 계산해서 반응형에 맞춰도 움직이지 않는 그림 만든다. svg는 컴포넌트처럼 임포트가 가능하다 */}
        </div>
      </div>
    </Layout2>
  );
}

export default Chatting;
