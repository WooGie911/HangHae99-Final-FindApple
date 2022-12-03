import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Apis from "../../shared/Apis";

export const __getPostDetail = createAsyncThunk(
  "details/__getPostDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getPostDetailAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPostComment = createAsyncThunk(
  "details/__addPostComment",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.addPostCommentAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePostComment = createAsyncThunk(
  "details/__deletePostComment",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.deletePostCommentAX(payload);
      if (data.data === "Success") {
        return thunkAPI.fulfillWithValue(payload);
      }
      console.log("삭제 성공 인데 메시지 이상? ");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartInPost = createAsyncThunk(
  "details/__CartInPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.CartInPostAX(payload);
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
      const data = await Apis.CartOutPostAX(payload);
      if (data.data === "찜 삭제") {
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
  initialState: {
    post: { updateComment: false },
  },
  reducers: {},
  extraReducers: {
    //__getPostDetail
    [__getPostDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
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
      state.post.updateComment = !state.post.updateComment;
      state.post = { ...state.post };
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
      state.post.updateComment = !state.post.updateComment;
      state.post = { ...state.post };
    },
    [__deletePostComment.rejected]: (state, action) => {
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
    },
    [__CartOutPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default PostDetailSlice.reducer;
