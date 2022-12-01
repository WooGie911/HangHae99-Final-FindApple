import React,{ useEffect }  from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {__getRoomList} from "../../../redux/modules/ChattingSlice"
import { __getinitialChatList } from "../../../redux/modules/ChattingSlice"


const ChatList = () => {
    const {id}  = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Room = useSelector((state) => state.chatting.roomList);
    
    useEffect(() => {

        dispatch(__getRoomList());
      }, []);

const onClickChatting = (item) => {


  navigate(`/Chatting/${item.roomId}`);

  dispatch(__getinitialChatList({
    postId:item.postId,
    roomId:item.roomId,
    
}));
localStorage.setItem("roomId", item.roomId)
}

  return (
      <>
      <Div onClick={(e) => e.stopPropagation()}>
            {  
             Room !== undefined && Room !== [] &&
             Room.map((item,i)=>{
               return(
               
                <div key={i}>

                    <span>{item.title}</span>
                    <span>
                        <button onClick={()=>onClickChatting(item)}>
                        {item.roomId}번방
                        </button>
                    </span>
                </div>

               )
              }
              )
            }
      </Div> 
      </>

  )
}

export default ChatList ;

const Div=styled.div`
width:360px;
height:350px;
background-color:blueviolet;
`

