import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

// api 나오면 data 부분 완성할 것
export const __getSellerinfo = createAsyncThunk(
  "sellerpage/__getSellerinfo",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getSellerInfoAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const SellerSlice = createSlice({
  name: "sellerpage",
  initialState: {
    myPostList: [],
    sellerInfoDto: {},
  },

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
