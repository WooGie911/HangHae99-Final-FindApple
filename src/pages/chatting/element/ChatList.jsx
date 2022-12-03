import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getRoomList } from "../../../redux/modules/ChattingSlice";
import { __getinitialChatList } from "../../../redux/modules/ChattingSlice";

const ChatList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Room = useSelector((state) => state.chatting.roomList);
  console.log(Room);

  useEffect(() => {
    dispatch(__getRoomList());
  }, []);

  const onClickChatting = (item) => {
    navigate(`/Chatting/${item.roomId}`);

    dispatch(
      __getinitialChatList({
        postId: item.postId,
        roomId: item.roomId,
      })
    );
    localStorage.setItem("roomId", item.roomId);
  };

  return (
    <>
      <Div onClick={(e) => e.stopPropagation()}>
        {Room !== undefined &&
          Room !== [] &&
          Room.map((item, i) => {
            return (
              <div key={i}>
                {item.chatList.length > 0 ? (
                  <>
                    <RoomList onClick={() => onClickChatting(item)}>
                      <Profile>
                        <div>
                          <img
                            src={item.postUserAvatarUrl}
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div>
                          <div>
                            {item.postUserNickname}{" "}
                            <Time>
                              {item.chatList[item.chatList.length - 1].sendDate}
                            </Time>
                          </div>
                          <Message>
                            {item.chatList[item.chatList.length - 1].message}
                            {/* 대화의 맨 마지막만 가지고 오는 로직이면 위와 같이 진행하면 됨 */}
                          </Message>
                        </div>
                      </Profile>
                      <SellImg>
                        {item.image !== undefined && (
                          <>
                            <img
                              src={item.image.imgUrl}
                              style={{ width: 44, height: 44 }}
                            />
                          </>
                        )}
                      </SellImg>
                    </RoomList>
                  </>
                ) : null}
              </div>
            );
          })}
      </Div>
    </>
  );
};

export default ChatList;
// 전체적인 레이아웃
const Div = styled.div`
  width: 339px;
  height: 376px;
  border-radius: 5px;
  background-color: white;
`;

const RoomList = styled.div`
  position: relative;
  height: 60px;
  border-bottom: 1px solid lightgrey;
`;

// 왼쪽 프로필 사항
const Profile = styled.div`
  display: flex;
`;

// 폰트사이즈 조정
const Time = styled.span`
  font-size: 10px;
  color: #c4c4c4;
`;

const Message = styled.div`
  font-size: 12px;
`;

// 오른쪽 판매 상품 사진
const SellImg = styled.div`
  img {
    border-radius: 5px;
    position: absolute;
    right: 25px;
    margin-top: -35px;
  }
`;
