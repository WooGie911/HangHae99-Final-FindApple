import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [{}],
  comment: [],
  user: {},
};
const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __emailCheck = createAsyncThunk(
  "Login/__emailCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/member/signup/mail-confirm`,
        payload
      );

      localStorage.setItem("emailCheckData", data.data);
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
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/member/kakao?code=${code}`
      );
      window.localStorage.setItem("Access_Token", res.data.accessToken);
      window.localStorage.setItem("Refresh_Token", res.data.refreshToken);

      window.localStorage.setItem("SITE", "KAKAO");
      window.location.replace("/");

      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");
      // 로그인 실패하면 로그인 화면으로 돌려보냄
      window.location.replace("/login");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 로그아웃 Thunk
export const __kakaoLogout = createAsyncThunk(
  "Login/__kakaoLogout",
  async (code, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/member/kakao?code=${code}`
      );
      window.localStorage.setItem("Access_Token", res.data.accessToken);
      window.localStorage.setItem("Refresh_Token", res.data.refreshToken);
      window.location.replace("/");

      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      // window.alert("로그인에 실패하였습니다.");
      // 로그인 실패하면 로그인 화면으로 돌려보냄
      window.location.replace("/signin");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __Signin = createAsyncThunk(
  "Login/__Signin",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/member/login`,
        payload
      );

      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.data.accessToken);
        window.localStorage.setItem("Refresh_Token", data.data.refreshToken);
        window.localStorage.setItem("SITE", "SITE");
        alert("로그인 성공");
        window.location.replace("/");
      }

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
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
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/member/signup`,
        payload
      );

      console.log("회원가입response", response);
      // alert(`${response.data.msg}`);
      if (response.data == "Success") {
        alert("회원가입 성공!");
        window.location.replace("/signin");
      }
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
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/myinfo`,
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

export const __UserProfileEdit = createAsyncThunk(
  "Login/__UserProfileEdit",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/myinfo/edit`,
        payload,
        {
          headers: {
            enctype: "multipart/form-data",
            Access_Token: accessToken,
            // Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//로그아웃
export const __logout = createAsyncThunk(
  "Login/__logout",
  async (payload, thunkAPI) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER}/api/logout`, {
          headers: {
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            localStorage.clear();
            alert("로그아웃 되었습니다");
            window.location.replace("/");
          }
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            localStorage.clear();
            alert("로그아웃 되었습니다");
            window.location.replace("/");
          }
        });
    } catch (error) {
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

    //__kakaoLogout
    [__kakaoLogout.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__kakaoLogout.rejected]: (state, action) => {
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
  },
});

export default LoginSlice.reducer;
