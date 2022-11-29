import styled, { css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import webstomp from "webstomp-client";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import { __getinitialChatList, chatList } from "../../redux/modules/ChattingSlice";
import '../../App.css';
import {v4 as uuidv4} from 'uuid';
// import Modal2 from "../chatting/Chattmodalfolder/Modal2";

function Chatting() {
  
  const {id}  = useParams()
  const navigate = useNavigate();
  const sock = new SockJS("http://3.38.228.74:8080/ws/chat");
  const ws = webstomp.over(sock);
  const dispatch = useDispatch();
  
  const listReducer = useSelector((state) => state.chatting.chatList);
  console.log(listReducer);
  // let postId = Number(id)

  useEffect(() => {
    
  
    dispatch(__getinitialChatList({
  
      postId:10,
      roomId:1
    }));

    return () => {
      onbeforeunloda()
      
    };
  
  }, []);
  
  useEffect(() => {
  
  
    wsConnectSubscribe()
    
    
    // return () => {
    //   console.log("???????")
    //   onbeforeunloda()
      
    // };
 
  }, [listReducer.id]);
  
  const [chatBody, setChatBody] = useState("");

  const content = {
    sender: "보내는이",
    message:chatBody
    };

  let headers = { 
    Access_Token: localStorage.getItem('Access_Token')
  };

  function wsConnectSubscribe() {
    try {
      ws.connect(
        headers,(frame) => {
          ws.subscribe(
            `/sub/1`,
            (response) => {
              console.log("어떻게 나오는지",response)
              let data = JSON.parse(response.body)
              dispatch(chatList(data))

            }
            );
        },
      );
    } catch (error) {
    }

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


const onbeforeunloda = () =>{

  try {
    ws.disconnect(
      ()=>{
        ws.unsubscribe("sub-0");
        clearTimeout(
          waitForConnection
          )
      },
    
    {Access_Token: localStorage.getItem('Access_Token')}
)
    }catch (e){
      console.log("연결구독해체 에러",e)
  }
}

  const inputHandler = (e) =>{
  setChatBody(e.target.value)
}

  //onSubmitHandler
const onSubmitHandler = (event) =>{
  //event.preventDefault()
  // if (chatBody=== "" || chatBody === " ") {
  //   return alert("내용을 입력해주세요.");
  //   }
    waitForConnection(ws,function() {   
  ws.send(
    `/pub/1`,
    JSON.stringify(content),
            {
              Access_Token: localStorage.getItem("Access_Token")
            },
      setChatBody("")     
          )})

}
const appKeyPress = (e) => {
  
  if (e.key === 'Enter') {
    onSubmitHandler()
    setChatBody("")
    
  }
}
//enter시 메시지 보냄
const scrollRef= useRef();

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


return(
  <div>

  { listReducer !== undefined && listReducer !== null &&
    listReducer.map((item)=>{
      return (
      <div key={item.key}><span>{item.message}</span></div>
      )
    }
      )
  }
   <div ref={scrollRef}></div>
 
  

  <div>
    <input onChange={inputHandler}/>
    <button onSubmit={appKeyPress} onClick={onSubmitHandler}>전송</button>
  </div>
  </div>
)



}

export default Chatting;

// return (
//         <LoginContainer>
//                 <Header>
               
//                      {/* <div>
//                       <Img onClick={()=>navigate(-1)} src={require("../chatting/chattingImg/png-clipart-computer-icons-arrow-previous-button-angle-triangle.png")}/>
//                       </div> */}
                      
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
