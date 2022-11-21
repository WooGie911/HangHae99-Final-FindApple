import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  objections: [],
  likes: [],
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getMyPost = createAsyncThunk(
  "mypage/__getMyPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myinfo/post`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data.myPostList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyObjection = createAsyncThunk(
  "mypage/__getMyObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myinfo/issue`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data.myIssuesList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyLike = createAsyncThunk(
  "mypage/__getMyLike",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myinfo/likes`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("마이라이크", data);
      return thunkAPI.fulfillWithValue(data.data.myLikesList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const MypageSlice = createSlice({
  name: "mypage",
  initialState,

  reducer: {},
  extraReducers: {
    //__getMyPost
    [__getMyPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getMyPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__getMyObjection
    [__getMyObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.objections = action.payload;
    },
    [__getMyObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__getMyLike
    [__getMyLike.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.likes = action.payload;
    },
    [__getMyLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default MypageSlice.reducer;
