import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: {},
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPostDetail = createAsyncThunk(
  "details/__getPostDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/post/detail/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("__getPostDetail", data);
      // console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPostComment = createAsyncThunk(
  "details/__addPostComment",
  async (payload, thunkAPI) => {
    console.log("__addPostComment -payload", payload);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload.id}`,
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

export const __deletePostComment = createAsyncThunk(
  "details/__deletePostComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload}`,
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

export const __editPostComment = createAsyncThunk(
  "details/__editPostComment",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      console.log(payload);
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/comment/${payload.id}`,
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

export const __CartInPost = createAsyncThunk(
  "details/__CartInPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/post/likes/${payload}`,
        "",
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
      if (data.data === "찜 성공") {
        console.log("찜 성공");
        return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
      }
      return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartOutPost = createAsyncThunk(
  "details/__CartOutPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/post/likes/${payload}`,
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
      if (data.data === "찜 삭제") {
        console.log("찜 삭제 성공");
        return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
      }
      return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostDetailSlice = createSlice({
  name: "details",
  initialState,

  reducers: {},
  extraReducers: {
    //__getPostDetail
    [__getPostDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      // console.log("state.post", state.post);
    },
    [__getPostDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //comment 부분

    //__addPostComment
    [__addPostComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPostComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.comments.push(action.payload);
    },
    [__addPostComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deletePostComment
    [__deletePostComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePostComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.comments = state.post.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
    },
    [__deletePostComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editPostComment
    [__editPostComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPostComment.fulfilled]: (state, action) => {
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
    [__editPostComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__CartInPost
    [__CartInPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartInPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;
      console.log("action", action);
      console.log("state.post.isLike", state.post.isLike);
    },
    [__CartInPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__CartOutPost
    [__CartOutPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartOutPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;

      console.log("action", action);
      console.log("state.post.isLike", state.post.isLike);
    },
    [__CartOutPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default PostDetailSlice.reducer;
