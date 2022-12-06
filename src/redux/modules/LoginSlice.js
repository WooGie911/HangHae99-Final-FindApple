import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

export const __emailCheck = createAsyncThunk(
  "Login/__emailCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.emailCheckAX(payload);
      localStorage.setItem("emailCheckData", data.data);
      alert("인증번호가 발송되었습니다.");
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 로그인 Thunk
export const __kakaoLogin = createAsyncThunk(
  "Login/__kakaoLogin",
  async (code, thunkAPI) => {
    try {
      const res = await Apis.kakaoLoginAX(code);
      window.localStorage.setItem("Access_Token", res.data.accessToken);
      window.localStorage.setItem("Refresh_Token", res.data.refreshToken);

      window.localStorage.setItem("SITE", "KAKAO");
      window.location.replace("/main");

      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");
      // 로그인 실패하면 로그인 화면으로 돌려보냄
      window.location.replace("/login");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __Signin = createAsyncThunk(
  "Login/__Signin",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.SigninAX(payload);

      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.data.accessToken);
        window.localStorage.setItem("Refresh_Token", data.data.refreshToken);
        window.localStorage.setItem("SITE", "SITE");
        alert("환영합니다");
        window.location.replace("/main");
      }
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        alert("아이디 및 비밀번호를 확인해주세요 ");
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
      const response = await Apis.SignUpAX(payload);

      console.log("회원가입response", response);
      // alert(`${response.data.msg}`);

      alert("회원가입 성공!");
      window.location.replace("/signin");

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      if (error.response.data.message !== undefined) {
        return window.alert(error.response.data.message);
      }
      window.alert(error.response.data[0].message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __UserProfile = createAsyncThunk(
  "Login/__UserProfile",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.UserProfileAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __UserProfileEdit = createAsyncThunk(
  "Login/__UserProfileEdit",
  async (payload, thunkAPI) => {
    try {
      await Apis.UserProfileEditAX(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    post: [{}],
    comment: [],
    user: {},
  },

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
    //__kakaoLogin
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__kakaoLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__UserProfile
    [__UserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [__UserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__UserProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__UserProfileEdit
    [__UserProfileEdit.pending]: (state) => {
      state.isLoading = true;
    },
    [__UserProfileEdit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      window.location.replace("/mypage");
    },
    [__UserProfileEdit.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default LoginSlice.reducer;
