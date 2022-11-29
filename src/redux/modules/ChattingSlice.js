import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = {
  createRoom: [],
  roomList:[],
  chatList:[],
  chatTrueFalse:false,
  isLoading: false,
  roomId: null,
  err: null,
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");
// 방만드는 코드
export const __CreateRoom = createAsyncThunk(
  "/chat/__CreateRoom",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/room`,         
      {
        headers: {
          "Content-Type": `application/json`,
          Access_Token: accessToken,
          Refresh_Token: refreshToken,
          "Cache-Control": "no-cache",
        },
      }
        )
      
      return thunkAPI.fulfillWithValue(response.data.data);
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
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/roomList`,         
      {
        headers: {
          "Content-Type": `application/json`,
          Access_Token: accessToken,
          Refresh_Token: refreshToken,
          "Cache-Control": "no-cache",
        },
      })
      
      return thunkAPI.fulfillWithValue(response.data.data);
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
      console.log("페이로드", payload);
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/roomInfo`, payload,         
      {
        headers: {
          "Content-Type": `application/json`,
          Access_Token: accessToken,
          Refresh_Token: refreshToken,
          "Cache-Control": "no-cache",
        },
      })
      console.log("res", response);
      return thunkAPI.fulfillWithValue(response.data.chatList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data);
    }
  }
);





const chatSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    postChat: (state, action) => {
      state.chatList.unshift(action.payload);
    },
    clearChat: (state, action) => {
      state.chatList = new Array(0);
    },
    trueChat: (state, action) => {
      state.chatTrueFalse = action.payload.mode
    },
 
    chatList: (state, action) => {
      state.chatList.push(action.payload)
    },

  },



  extraReducers: {
    [__CreateRoom.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__CreateRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.createRoom = action.payload;
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
      console.log("액션" , action.payload);
      state.isLoading = false;
      state.chatList = action.payload;
      
    
    },
    [__getinitialChatList.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { postChat, clearChat,trueChat,chatList } = chatSlice.actions;

export default chatSlice.reducer;