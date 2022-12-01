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

function Chatting() {
  const sock = new SockJS(`${process.env.REACT_APP_Chatting_SERVER}/ws/chat`);
  const ws = webstomp.over(sock);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let roomId = Number(localStorage.getItem("roomId"));
  const listReducer = useSelector((state) => state.chatting.chatList);
  useEffect(() => {
    console.log(listReducer);
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
    sender: listReducer.nickname,
    message: chatBody,
  };
  let headers = {
    Access_Token: localStorage.getItem("Access_Token"),
  };
  function wsConnectSubscribe() {
    try {
      ws.connect(headers, (frame) => {
        ws.subscribe(`/sub/${roomId}`, (response) => {
          console.log("어떻게 나오는지", response);
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
    } catch (e) {
      console.log("연결구독해체 에러", e);
    }
  };

  const inputHandler = (e) => {
    setChatBody(e.target.value);
  };

  //onSubmitHandler
  const onSubmitHandler = (event) => {
    event.preventDefault();
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
    <StContainer>
      <HeadContainer>
        <img
          onClick={onClickHandler}
          style={{ width: 25, height: 25 }}
          src={back}
        />
        <span>
          {" "}
          <div>{listReducer.nickname}</div>
        </span>
      </HeadContainer>
      <TitleContainer>
        <img src={listReducer.image.imgUrl} style={{ width: 44, height: 44 }} />
      </TitleContainer>
      <ChatDiv>
        {listReducer.chatList !== undefined &&
          listReducer.chatList !== null &&
          listReducer.chatList.map((item) => {
            return (
              <div key={uuidv4()}>
                <span>{item.message}</span>
              </div>
            );
          })}
        <div ref={scrollRef}></div>

        <div>
          <input value={chatBody} onChange={inputHandler} />
          {/* value를 줘야 사라진다 */}
          <button onSubmit={appKeyPress} onClick={onSubmitHandler}>
            전송
          </button>
        </div>
      </ChatDiv>
    </StContainer>
  );
}

export default Chatting;
const StContainer = styled.div`
  height: 100%;
  padding: 20px;
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
  overflow: auto;
`;

// title
const TitleContainer = styled.div`
  height: 60px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  img {
    margin-top: 10px;
  }
`;

// return (
//         <LoginContainer>
//                 <Header>

//                      <div>
//                       <Nickname>{chatList.postNickname}</Nickname>
//                       <Time>30분 전 접속 </Time>

//                     </div>

//                     {/* <Modal2/> */}
//                 </Header>
//                 <Section>
//                     <Profile><Img2>{chatList.postImg}</Img2></Profile>
//                     <TextBox>

//                         <OrangeSpan>{chatList.state}</OrangeSpan>
//                         <Span></Span>
//                         <Title>{chatList.title}</Title>
//                         <Money>{chatList.price}원</Money>

//                     </TextBox>
//                 </Section>
//                   <DivAt>날짜 오늘</DivAt>
//                   <OverFlow sx={{ height: "80%", overflow: "scroll" }} >

//                       {/* { chatList.chatList !== undefined && chatList.chatList !== null &&
//                        chatList.chatList.map((item,i)=>{
//                           return(

//                           localStorage.getItem('user-nickname') == item.sender ?
//                         <TextBox key={uuidv4()}><Colorspan>{item.message}</Colorspan></TextBox>
//                         :
//                         <TextBox key={uuidv4()}><Colorspan2>{item.message}</Colorspan2></TextBox>

//                           )
//                         })
//                       } */}

//                       { listReducer.chatList !== undefined && listReducer.chatList !== null &&
//                         listReducer.chatList.map((item,i)=>{
//                           return (
//                             localStorage.getItem('user-nickname') == item.sender ?
//                           <TextBox key={uuidv4()}><Colorspan>{item.message}</Colorspan></TextBox>
//                           :
//                           <TextBox key={uuidv4()}><Colorspan2>{item.message}</Colorspan2></TextBox>
//                           )
//                         }
//                           )
//                       }

//                       <div ref={scrollRef}></div>
//                   </OverFlow >
//                 <Chatput>

//                     <Input  value={chatBody}  onKeyPress={appKeyPress}  onChange={inputHandler}></Input>
//                     {/* <ArrowImg  onSubmit={appKeyPress} onClick={onSubmitHandler} src={require("../chatting/chattingImg/iconSand.png")}></ArrowImg> */}
//                 </Chatput>
//         </LoginContainer>
// );
