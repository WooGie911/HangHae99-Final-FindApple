import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

export const __searchPost = createAsyncThunk(
  "posts/__searchPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.searchPostAX(payload);
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getAddPost = createAsyncThunk(
  "posts/__getAddPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getAddPostAX(payload);

      const obj = {
        payload: payload.page,
        data: data.data.content,
        totalElements: data.data.totalElements,
      };
      return thunkAPI.fulfillWithValue(obj);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  "posts/__getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getPostAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "posts/__addPost",
  async (payload, thunkAPI) => {
    try {
      await Apis.addPostAX(payload).then((response) => {
        return thunkAPI.fulfillWithValue(response.data.data);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/__deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.deletePostAX(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editPost = createAsyncThunk(
  "posts/__editPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.editPostAX(payload);
      const payloadData = { ...payload, data: data.data };
      return thunkAPI.fulfillWithValue(payloadData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsCount: 0,

    HeaderState: {
      paramObj: "all",
      pageNumber: 0,
      pageSize: 10,
      postSort: "postId",
    },
    footerState: "Home",
  },
  reducers: {
    initialHeaderState(state, action) {
      state.HeaderState = action.payload.HeaderState;
      state.footerState = action.payload.footerState;
    },
    swichFooterState(state, action) {
      state.footerState = action.payload;
    },
  },
  extraReducers: {
    //__searchPost
    [__searchPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__searchPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__searchPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },

    //__getAddPost
    [__getAddPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAddPost.fulfilled]: (state, action) => {
      state.isLoading = false;

      if (action.payload.payload === 0) {
        state.posts.splice(0);
        state.posts.push(...action.payload.data);
        state.postsCount = action.payload.totalElements;
      } else {
        state.posts.push(...action.payload.data);
        state.postsCount = action.payload.totalElements;
      }
    },
    [__getAddPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__getPost
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.content;
      state.postsCount = action.payload.totalElements;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__addPost
    [__addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      window.location.replace("/postread/all");
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__deletePost
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.postId !== action.payload
      );
      window.location.replace("/postread/all");
    },

    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editPost
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;

      const paramId = state.posts.findIndex((post) => {
        if (post.postId == action.payload.data.postId) {
          return true;
        }
        return false;
      });
      state.posts[paramId] = action.payload.data;
      state.posts = [...state.posts];
      window.location.replace(`/PostDetail/${action.payload.id}`);
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { swichHeaderBarState, swichFooterState, initialHeaderState } =
  PostsSlice.actions;
export default PostsSlice.reducer;
