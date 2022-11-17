import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tagList: [],
  tagList2: {},
  DetailPrice: {},
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPriceInfo = createAsyncThunk(
  "price/__getPriceInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/price/${payload}`,
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

export const __checkPrice = createAsyncThunk(
  "price/__checkPrice",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      console.log("payload.....", payload.category);
      console.log("payload.....data", payload.Data);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/price/${payload.category}`,
        payload.Data,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PriceSlice = createSlice({
  name: "price",
  initialState,

  reducer: {
    // checkPricingDetail(state, action) {
    //   console.log("action.payload", action.payload);
    //   // state.DetailPrice = action.payload;
    //   console.log("state.DetailPrice", state.DetailPrices);
    // },
  },
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
      console.log(action.payload);
    },
    [__checkPrice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { checkPricingDetail } = PriceSlice.actions;
export default PriceSlice.reducer;
