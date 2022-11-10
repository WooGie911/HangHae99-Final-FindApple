import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");
console.log(accessToken);
console.log(refreshToken);

//검색기능 미완성
export const __searchObjection = createAsyncThunk(
  "posts/__searchObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/post`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: accessToken,
          RefreshToken: refreshToken,
          "Cache-Control": "no-cache",
        },
      });
      // console.log("data", data);
      console.log("__searchPost", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getObjection = createAsyncThunk(
  "objections/__getObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issues`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("data", data);
      console.log("__getObjection", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addObjection = createAsyncThunk(
  "objections/__addObjection",
  async (payload, thunkAPI) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER}/api/issue`,
          payload,
          // {
          //   headers: {
          //     "Content-Type": `application/json`,
          //     Authorization: accessToken,
          //     RefreshToken: refreshToken,
          //     "Cache-Control": "no-cache",
          //   },
          // }
          {
            headers: {
              enctype: "multipart/form-data",
              Authorization: accessToken,
              RefreshToken: refreshToken,
              "Cache-Control": "no-cache",
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          return thunkAPI.fulfillWithValue(response.data.data);
        });
    } catch (error) {
      console.log("error", error);
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
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("response", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editObjection = createAsyncThunk(
  "objections/__editObjection",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/issue/${payload.postId}`,
        payload.formData,
        {
          headers: {
            // "Content-Type": `application/json`,
            enctype: "multipart/form-data",
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("data", data.data);
      console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __heartObjection = createAsyncThunk(
  "objections/__heartObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/likes/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
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

const ObjectionsSlice = createSlice({
  name: "objections",
  initialState,
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

    //__getObjection
    [__getObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
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
        (post) => post.postId !== action.payload
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
        if (post.postId == action.payload.postId) {
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
    //__heartObjection
    [__heartObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__heartObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__heartObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ObjectionsSlice.reducer;
