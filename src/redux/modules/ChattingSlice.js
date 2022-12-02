import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../shared/Apis";


const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");
// 방만드는 코드
export const __CreateRoom = createAsyncThunk(
  "/chat/__CreateRoom",
  async (payload, thunkAPI) => {
    try {
      // const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/chat/room`, payload.postId,
      const response = await axios.post(
        `${process.env.REACT_APP_Chatting_SERVER}/api/chat/room`,
        payload.postId,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// 방리스트
export const __getRoomList = createAsyncThunk(
  "/chat/__getRoomList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER}/api/chat/roomList`,
        ` ${process.env.REACT_APP_Chatting_SERVER}/api/chat/roomList`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 메인 채팅 화면
export const __getinitialChatList = createAsyncThunk(
  "/chat/__getInitialChatList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        // `${process.env.REACT_APP_SERVER}/api/chat/roomInfo`,
        `${process.env.REACT_APP_Chatting_SERVER}/api/chat/roomInfo`,
        payload,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chatting",
  initialState: {
    createRoom: 0,
    roomList: [],
    chatList: [],
    chatTrueFalse: false,
    isLoading: false,
    roomId: null,
    err: null,
  },
  reducers: {
    // postChat: (state, action) => {
    //   console.log("action", action.payload);
    //   state.chatList.unshift(action.payload);
    // },
    clearChat: (state, action) => {
      state.chatList = new Array(0);
    },
    trueChat: (state, action) => {
      state.chatTrueFalse = action.payload.mode;
    },

    chatList: (state, action) => {
      state.chatList.chatList.push(action.payload);
    },
  },

  extraReducers: {
    [__CreateRoom.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__CreateRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action", action.payload);
      state.createRoom = action.payload.roomId;
    },
    [__CreateRoom.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [__getRoomList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getRoomList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    [__getRoomList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [__getinitialChatList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getinitialChatList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatList = action.payload;
    },
    [__getinitialChatList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { postChat, clearChat, trueChat, chatList } = chatSlice.actions;

export default chatSlice.reducer;
