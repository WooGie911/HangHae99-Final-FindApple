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

const PriceSlice = createSlice({
  name: "price",
  initialState,

  reducer: {
    checkPricingDetail(state, action) {
      console.log("action.payload", action.payload);
      // state.DetailPrice = action.payload;
      console.log("state.DetailPrice", state.DetailPrices);
    },
  },
  extraReducers: {
    //__getPriceInfo
    [__getPriceInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPriceInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      // const { element } = action.payload;
      // state.tagList = { ...state.tagList, element };
      // console.log("배열", typeof action.payload);
      if (typeof action.payload === Array) {
        console.log("배열?");
        return (state.tagList2 = action.payload);
      }
      console.log("배열???");
      state.tagList = action.payload;

      console.log("state.tagList 슬라이스", state.tagList);
    },
    [__getPriceInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { checkPricingDetail } = PriceSlice.actions;
export default PriceSlice.reducer;
