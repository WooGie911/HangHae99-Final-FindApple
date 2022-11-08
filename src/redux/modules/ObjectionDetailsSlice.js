import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getObjectionDetail = createAsyncThunk(
  "objectionDetails/__getPostDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`https://jkk.p-e.kr/api/post/${payload}`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: accessToken,
          RefreshToken: refreshToken,
          "Cache-Control": "no-cache",
        },
      });
      //   console.log("__getPostDetail", data.data.data);
      // console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//comment 부분

export const __addObjectionComment = createAsyncThunk(
  "objectionDetails/__addObjectionComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      //console.log(payload)
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post(
        `https://jkk.p-e.kr/api/comment/${payload.id}`,
        // JSON.stringify(payload.comment),
        payload.comment,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload.comment);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteObjectionComment = createAsyncThunk(
  "objectionDetails/__deleteObjectionComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(
        `https://jkk.p-e.kr/api/comment/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("페이로드",payload);
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editObjectionComment = createAsyncThunk(
  "objectionDetails/__editObjectionComment",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      console.log(payload);
      const data = await axios.put(
        `https://jkk.p-e.kr/api/comment/${payload.id}`,
        JSON.stringify(payload.comment),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ObjectionDetailsSlice = createSlice({
  name: "objectionDetails",
  initialState,

  reducers: {},
  extraReducers: {
    //__getObjectionDetail
    [__getObjectionDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjectionDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      // console.log("state.post", state.post);
    },
    [__getObjectionDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //comment 부분

    //__addObjectionComment
    [__addObjectionComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addObjectionComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.commentList.push(action.payload);
    },
    [__addObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deleteObjectionComment
    [__deleteObjectionComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteObjectionComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.commentList = state.post.commentList.filter(
        (comment) => comment.commentId !== action.payload
      );
    },
    [__deleteObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editObjectionComment
    [__editObjectionComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editObjectionComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.comment.findIndex((comment) => {
        if (comment.commentId == action.payload.id) {
          return true;
        }
        return false;
      });
      state.comment[indexId] = action.payload.comment;

      state.comment = [...state.comment];
    },
    [__editObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ObjectionDetailsSlice.reducer;
