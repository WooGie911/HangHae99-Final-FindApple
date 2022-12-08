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
import back from "../../assets/back.png";
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
      <StContainer>
        <HeadContainer>
          <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
          <span>
            {" "}
            <div>{listReducer.otherNickname}</div>
          </span>
        </HeadContainer>
        <TitleContainer>
          {listReducer.image !== undefined && (
            <>
              <img
                src={listReducer.image.imgUrl}
                style={{ width: 44, height: 44 }}
              />
            </>
          )}
          <div>
            <div>{listReducer.title}</div>
            <div>
              {listReducer.price !== undefined && (
                <>{listReducer.price.toLocaleString("ko-KR")}원</>
              )}
            </div>
          </div>
        </TitleContainer>
        <ChatDiv>
          {listReducer.chatList !== undefined &&
            listReducer.chatList !== null &&
            listReducer.chatList.map((item) => {
              return (
                <>
                  {listReducer.senderId === item.sender ? (
                    <ChatStyle key={uuidv4()} style={{ textAlign: "right" }}>
                      {/* 인라인 요소로 바로 우측 정렬 해결 */}
                      <TimeDiv>
                        <TimeSpan>{item.sendDate}</TimeSpan>
                        <JoinUserNickname>{item.message}</JoinUserNickname>
                      </TimeDiv>
                    </ChatStyle>
                  ) : (
                    <ChatStyle key={uuidv4()}>
                      <TimeDiv>
                        <PostUserNickname>{item.message}</PostUserNickname>
                        <TimeSpan>{item.sendDate}</TimeSpan>
                      </TimeDiv>
                    </ChatStyle>
                  )}
                </>
              );
            })}
          <div ref={scrollRef}></div>
        </ChatDiv>
        <InputDiv>
          <Input
            value={chatBody}
            onChange={inputHandler}
            onKeyPress={appKeyPress}
            placeholder="채팅을 입력하세요(20자 내)"
            maxLength="20"
          />
          {/* value를 줘야 사라진다 */}
          <Send
            onClick={onSubmitHandler}
            style={{
              position: "fixed",
              left: "calc(50% + 140px)",
              transform: "translateX(-50%)",
              bottom: 25,
            }}
          />
          {/* calc로 계산해서 반응형에 맞춰도 움직이지 않는 그림 만든다. svg는 컴포넌트처럼 임포트가 가능하다 */}
        </InputDiv>
      </StContainer>
    </Layout2>
  );
}

export default Chatting;
const StContainer = styled.div`
  height: 100%;
  padding: 20px;
  overflow: auto;
`;

//헤더
const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  img {
    position: absolute;
    left: 10px;
  }
`;

const ChatDiv = styled.div`
  height: 100%;
`;

// title
const TitleContainer = styled.div`
  height: 60px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  img {
    margin-top: 10px;
  }
  display: flex;

  div {
    font-size: 16px;
    padding: 1.5px;
    margin-left: 1.5px;
  }
`;

// chatting창 꾸미기

//chat style
const ChatStyle = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

//나
const JoinUserNickname = styled.span`
  padding: 7px;
  background: #3d6af2;
  border-radius: 20px 20px 0px 20px;
  color: white;
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
  max-width: 250px;
  height: auto;
  white-space: pre-wrap;
`;
//상대방
const PostUserNickname = styled.span`
  padding: 7px;
  background: #d9d9d9;
  border-radius: 20px 15px 15px 0px;
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
  max-width: 250px;
  height: auto;
  white-space: pre-wrap;
`;

// 시간
const TimeDiv = styled.div``;
//시간 상세
const TimeSpan = styled.span`
  font-size: 10px;
  color: #c4c4c4;
`;

// input 창
const InputDiv = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  position: relative;
  bottom: 20px;
  left: 0;
`;

const Input = styled.input`
  margin-top: 30px;
  width: 339px;
  height: 38px;
  background-color: transparent;
  border: 1px solid black;
  padding: 10px;
  position: fixed;
  bottom: 15px;
  border-radius: 50px;
  left: 50%;
  transform: translateX(-50%);
`;
