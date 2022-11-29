import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPriceInfo = createAsyncThunk(
  "price/__getPriceInfo",
  async (payload, thunkAPI) => {
    try {
      console.log("페이로드 뭐야", payload);
      const data = await axios.get(
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
      const myPayload = {
        ...payload,
        getList: data.data,
      };
      console.log("겟프라이스인포", data);
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
    BackAPI: "",
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

  reducer: {},
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
      state.BackAPI = action.payload.BackAPI;
      console.log("state.stepState", state.stepState);
      console.log("state.getList", state.getList);
      console.log("state.priceLists", state.priceLists);
      console.log("state.BackAPI", state.BackAPI);
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
