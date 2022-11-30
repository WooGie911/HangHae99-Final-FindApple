import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPriceInfo = createAsyncThunk(
  "price/__getPriceInfo",
  async (payload, thunkAPI) => {
    try {
      let data = {};
      // console.log("페이로드 뭐야", payload);
      if (payload.API !== "") {
        data = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/price/${payload.API}`,
          {
            headers: {
              "Content-Type": `application/json`,
              Access_Token: accessToken,
              Refresh_Token: refreshToken,
              "Cache-Control": "no-cache",
            },
          }
        );
      }
      const myPayload = {
        ...payload,
        getList: data.data,
      };
      return thunkAPI.fulfillWithValue(myPayload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __checkPrice = createAsyncThunk(
  "price/__checkPrice",
  async (payload, thunkAPI) => {
    try {
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PriceSlice = createSlice({
  name: "price",
  initialState: {
    stepState: 1,
    BackGetAPI: "",
    BackNaviAPI: "",
    priceLists: {
      category: "",
      years: 0,
      model: "",
      options: "",
      batteryState: 0,
      careOX: "",
      careDate: "",
      iphoneState: "",
      macbookState: "",
      ram: "",
      storage: "",
      keyboard: "",
    },
    getList: [],
    DetailPrice: {},
  },

  reducers: {
    chagePriceSet(state, action) {
      // console.log("체인지프라이스");
      // console.log("체인지프라이스", action);
      state.stepState = action.payload;
      // state.getList = action.payload.getList;
      // state.priceLists = action.payload.priceLists;
      // state.BackGetAPI = action.payload.BackGetAPI;
      // state.BackNaviAPI = action.payload.BackNaviAPI;
    },
  },
  extraReducers: {
    //__getPriceInfo
    [__getPriceInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPriceInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.stepState = action.payload.stepState;
      state.getList = action.payload.getList;
      state.priceLists = action.payload.priceLists;
      state.BackGetAPI = action.payload.BackGetAPI;
      state.BackNaviAPI = action.payload.BackNaviAPI;
      console.log("state.stepState", state.stepState);
      console.log("state.getList", state.getList);
      console.log("state.priceLists", state.priceLists);
      console.log("state.BackGetAPI", state.BackGetAPI);
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

export const { chagePriceSet } = PriceSlice.actions;
export default PriceSlice.reducer;
