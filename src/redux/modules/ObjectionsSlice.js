import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __searchObjection = createAsyncThunk(
  "objections/__searchObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload.paramObj}/${payload.searchObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getAddObjection = createAsyncThunk(
  "objections/__getAddObjection",
  async (payload, thunkAPI) => {
    console.log("pay", payload);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload.state.paramObj}?page=${payload.page}&size=${payload.state.pageSize}&sort=${payload.state.postSort},DESC`,

        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      const obj = {
        payload: payload.page,
        data: data.data.content,
      };
      console.log(obj);
      return thunkAPI.fulfillWithValue(obj);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getObjection = createAsyncThunk(
  "objections/__getObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload.paramObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`,

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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addObjection = createAsyncThunk(
  "objections/__addObjection",
  async (payload, thunkAPI) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/issue`, payload, {
          headers: {
            enctype: "multipart/form-data",
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
          return thunkAPI.fulfillWithValue(response.data.data);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteObjection = createAsyncThunk(
  "objections/__deleteObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editObjection = createAsyncThunk(
  "objections/__editObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload.id}`,
        payload.formData,
        {
          headers: {
            // "Content-Type": `application/json`,
            enctype: "multipart/form-data",
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );

      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ObjectionsSlice = createSlice({
  name: "objections",
  initialState: {
    posts: [],

    postsCount: 0,

    HeaderState: {
      paramObj: "all",
      pageNumber: 0,
      pageSize: 10,
      postSort: "issuesId",
    },
  },
  reducers: {},
  extraReducers: {
    //__searchObjection
    [__searchObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__searchObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__searchObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__getAddObjection
    [__getAddObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAddObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload.data);
      if (action.payload.payload === 0) {
        state.posts.splice(0);
        state.posts.push(...action.payload.data);
      } else {
        state.posts.push(...action.payload.data);
      }
    },
    [__getAddObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__getObjection
    [__getObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.content;
      state.postsCount = action.payload.totalElements;
    },
    [__getObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__addObjection
    [__addObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__addObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [__addObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__deleteObjection
    [__deleteObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.issuesId !== action.payload
      );
    },

    [__deleteObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editObjection
    [__editObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__editObjection.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.posts.findIndex((post) => {
        if (post.issuesId == action.payload.issuesId) {
          return true;
        }
        return false;
      });
      state.posts[indexId] = action.payload;

      state.posts = [...state.posts];
    },
    [__editObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ObjectionsSlice.reducer;
