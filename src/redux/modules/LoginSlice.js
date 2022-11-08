import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [{}],
  comment: [],
};

export const __Signin = createAsyncThunk(
  "Login/__Signin",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/member/login`,
        payload
      );
      console.log(data);

      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.headers.authorization);
        window.localStorage.setItem("Refresh_Token", data.headers.refresh);
        alert("로그인 성공");
        window.location.replace("/main");
      }
      console.log("로그인 응답", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("로그인 에러", error.response.data.message);
      if (error.response.status >= 400 && error.response.status < 500) {
        alert("로그인 실패");
      }
      if (error.response.status === 400) {
        //비밀번호 오류
        alert(`${error.response.data.field}가 ${error.response.data.message}`);
      } else if (error.response.data.message !== undefined) {
        //아이디 오류
        alert(`${error.response.data.field} ${error.response.data.message}`);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __SignUp = createAsyncThunk(
  "Login/__SignUp",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios
        .post(`${process.env.REACT_APP_SERVER}/api/member/signup`, payload)

        .then((response) => {
          console.log("회원가입response", response.data.msg);
          alert(`${response.data.msg}`);
          if (response.data.msg == "회원가입이 완료되었습니다.") {
            window.location.replace("/");
          }
          return thunkAPI.fulfillWithValue(response.data);
        });
      console.log("회원가입응답", data);
    } catch (error) {
      console.log("error", error);
      //이미 존재하는 데이터 예외처리 (아이디, 닉네임)
      if (error.response.data.message !== undefined) {
        return window.alert(error.response.data.message);
      }
      //입력 형식에 맞지 않는 예외처리 메시지 (이메일형식, 비밀번호 형식)
      window.alert(error.response.data[0].message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState,

  reducers: {},
  extraReducers: {
    //__Signin
    [__Signin.pending]: (state) => {
      state.isLoading = true;
    },
    [__Signin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__Signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__SignUp
    [__SignUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__SignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__SignUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default LoginSlice.reducer;
