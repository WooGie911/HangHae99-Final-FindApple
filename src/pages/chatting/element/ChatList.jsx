import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getRoomList } from "../../../redux/modules/ChattingSlice";
import { __getinitialChatList } from "../../../redux/modules/ChattingSlice";

const ChatList = () => {
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
    <div className=" w-[375px] px-4">
      <div
        className="bg-white rounded-lg "
        onClick={(e) => e.stopPropagation()}
      >
        {Room !== undefined &&
          Room !== [] &&
          Room.map((item, i) => {
            return (
              <>
              <div className=" px-3 py-1 border-b-[0.5px] border-D9 " key={i}>
                {item.chatList.length > 0 && (
                  <div
                    className="  flex justify-between items-center h-14 "
                    onClick={() => onClickChatting(item)}
                  >
                    <div className="flex  items-center w-full">
                      <img
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                        src={item.otherUserAvatarUrl}
                      />


                        <div className=" ml -2 flex-col text-sm ">
                          <div className="flex">
                            {item.nickname === item.postUserNickname ? (
                              <div className="font-semibold">
                                {item.joinUserNickname}
                              </div>
                            ) : (
                              <div className="font-semibold">
                                {item.postUserNickname}
                              </div>
                            )}
                            <div className="text-OO text-xs">
                              {item.chatList[item.chatList.length - 1].sendDate}
                            </div>
                          </div>
                          <div className="text-xs">
                            {item.chatList[item.chatList.length - 1].message}
                          </div>
                        </div>
                      </div>

                      {item.image !== undefined && (
                        <img
                          className="w-11 h-11 object-cover rounded-lg flex-shrink-0"
                          src={item.image.imgUrl}
                        />
                      )}
                    </div>
                  )}
                </div>
                <hr className="last-of-type:hidden border-t-[0.5px] border-D9" />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ChatList;
