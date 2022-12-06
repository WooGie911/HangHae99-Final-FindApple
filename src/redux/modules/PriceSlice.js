import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../shared/Apis";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPriceInfo = createAsyncThunk(
  "price/__getPriceInfo",
  async (payload, thunkAPI) => {
    try {
      let data = {};
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
      // const response = await Apis.checkPriceAX(payload);
      // return thunkAPI.fulfillWithValue(response.data);

      const data = await axios.post(
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
      const myPayload = {
        ...payload,
        data: data.data,
      };
      return thunkAPI.fulfillWithValue(myPayload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PriceSlice = createSlice({
  name: "price",
  initialState: {
    stepState: 1,
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
    getList2: [],
    getList3: [],
    getList4: [],
    getList5: [],
    DetailPrice: {},
  },

  reducers: {
    swichStepState(state, action) {
      state.stepState = action.payload.stepState;
      state.priceLists = action.payload.priceLists;
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
      state.priceLists = action.payload.priceLists;
      if (action.payload.stepState === 2) {
        state.getList2 = action.payload.getList;
      } else if (action.payload.stepState === 3) {
        state.getList3 = action.payload.getList;
      } else if (action.payload.stepState === 4) {
        state.getList4 = action.payload.getList;
      } else if (action.payload.stepState === 5) {
        state.getList5 = action.payload.getList;
      }
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
      state.DetailPrice = action.payload.data;
      state.priceLists = action.payload.priceLists;
    },
    [__checkPrice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { swichStepState } = PriceSlice.actions;
export default PriceSlice.reducer;
