import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

const initialState = {
  myPostList: [],
  sellerInfoDto: {},
};



// api 나오면 data 부분 완성할 것
export const __getSellerinfo = createAsyncThunk(
  "sellerpage/__getSellerinfo",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getsellerinfoAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const SellerSlice = createSlice({
  name: "sellerpage",
  initialState,

  reducer: {},
  extraReducers: {
    //__getSellerinfo
    [__getSellerinfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSellerinfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPostList = action.payload.myPostList;
      state.sellerInfoDto = action.payload.sellerInfoDto;
    },
    [__getSellerinfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default SellerSlice.reducer;

//sellerPost : {},
//sellerPostList: [],
// export const __getSellerPost = createAsyncThunk(
//   "sellerpage/__getSellerPost",
//   async(payload, thunkAPI) => {
//     try {
//       const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/myinfo/issue`)
//       return thunkAPI.fulfillWithValue(data.data.data);
//     } catch(error){
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// )

// export const __getSellerPostList = createAsyncThunk(
//   "sellerpage/__getSellerPostList",
//   async(payload, thunkAPI) => {
//     try {
//       const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/myinfo/likes`)
//       return thunkAPI.fulfillWithValue(data.data.data);
//     } catch(error){
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// )

// //__getSellerPost
// [__getSellerPost.pending]: (state) => {
//   state.isLoading = true;
// },
// [__getSellerPost.fulfilled]: (state, action) => {
//   state.isLoading = false;
//   state.sellerPost = action.payload;
// },
// [__getSellerPost.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// },
// //__getSellerPostList
// [__getSellerPostList.pending]: (state) => {
//   state.isLoading = true;
// },
// [__getSellerPostList.fulfilled]: (state, action) => {
//   state.isLoading = false;
//   state.sellerPostList = action.payload;
// },
// [__getSellerPostList.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// },
