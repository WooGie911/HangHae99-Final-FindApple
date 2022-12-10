import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

export const __getObjectionDetail = createAsyncThunk(
  "objectionDetails/__getObjectionDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getObjectionDetailAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addObjectionComment = createAsyncThunk(
  "objectionDetails/__addObjectionComment",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.addObjectionCommentAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteObjectionComment = createAsyncThunk(
  "objectionDetails/__deleteObjectionComment",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.deleteObjectionCommentAX(payload);
      if (data.data === "댓글 삭제 성공") {
        return thunkAPI.fulfillWithValue(payload);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartInObjection = createAsyncThunk(
  "objectionDetails/__CartInObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.CartInObjectionAX(payload, "");
      if (data.data === "찜 성공") {
        return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
      }
      return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartOutObjection = createAsyncThunk(
  "objectionDetails/__CartOutObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.CartOutObjectionAX(payload);
      if (data.data === "찜 삭제") {
        return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
      }
      return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ObjectionDetailsSlice = createSlice({
  name: "objectionDetails",
  initialState: {
    post: { updateComment: false },
  },
  reducers: {},
  extraReducers: {
    //__getObjectionDetail
    [__getObjectionDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjectionDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
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
      state.post.updateComment = !state.post.updateComment;
      state.post = { ...state.post };
      alert("댓글이 등록 되었습니다.");
    },
    [__addObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert("댓글 등록에 실패하였습니다.");
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
      alert("댓글이 삭제되었습니다.");
    },
    [__deleteObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      alert("댓글 삭제에 실패하였습니다.");
      state.error = action.payload;
    },

    //__CartInObjection
    [__CartInObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartInObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;
    },
    [__CartInObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__CartOutObjection
    [__CartOutObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartOutObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;
    },
    [__CartOutObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ObjectionDetailsSlice.reducer;
