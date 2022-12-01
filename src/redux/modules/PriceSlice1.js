import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../shared/Apis";

const initialState = {
  tagList: [],
  tagList2: {},
  DetailPrice: {},
};


export const __getPriceInfo = createAsyncThunk(
  "price/__getPriceInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getPriceInfoAX(payload);
      console.log("겟프라이스인포", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __checkPrice = createAsyncThunk(
  "price/__checkPrice",
  async (payload, thunkAPI) => {
    try {
      const response = await Apis.checkPriceAX(payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PriceSlice = createSlice({
  name: "price",
  initialState,

  reducer: {},
  extraReducers: {
    //__getPriceInfo
    [__getPriceInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPriceInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tagList = action.payload;
      state.tagList2 = action.payload;
    },
    [__getPriceInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__checkPrice
    [__checkPrice.pending]: (state) => {
      state.isLoading = true;
    },
    [__checkPrice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailPrice = action.payload;
    },
    [__checkPrice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { checkPricingDetail } = PriceSlice.actions;
export default PriceSlice.reducer;
