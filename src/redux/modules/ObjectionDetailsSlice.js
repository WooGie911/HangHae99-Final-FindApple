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
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issue/detail/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//comment 부분

export const __addObjectionComment = createAsyncThunk(
  "objectionDetails/__addObjectionComment",
  async (payload, thunkAPI) => {
    try {
      //console.log(payload)
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/issue-comment/${payload.id}`,
        // JSON.stringify(payload.comment),
        payload.comment,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data);
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
        `${process.env.REACT_APP_SERVER}/api/issue-comment/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("페이로드",payload);
      if (data.data === "Success") {
        console.log("삭제 성공");
        return thunkAPI.fulfillWithValue(payload);
      }
      console.log("삭제 성공 인데 메시지 이상? ");
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
        `${process.env.REACT_APP_SERVER}/api/issue-comment/${payload.id}`,
        JSON.stringify(payload.comment),
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
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
      state.post.comments.push(action.payload);
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
      state.post.comments = state.post.comments.filter(
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
        if (comment.id == action.payload.id) {
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
