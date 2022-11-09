import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [{}],
  comment: [],
};

export const __emailCheck = createAsyncThunk(
  "posts/__emailCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/post`,
        payload
      );
      // console.log("data", data);
      console.log("__emailCheck", data);
      localStorage.setItem("emailCheckData", data.data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __kakaoLogin = (code) => {
  return function (dispatch, getState) {
    axios
      .get(`http://43.201.116.82/user/kakao/callback?code=${code}`)
      .then((res) => {
        console.log("넘어온 토큰값", res); // 토큰이 넘어올 것임
        const Access_Token = res.data.accessToken;
        localStorage.setItem("token", Access_Token);
        // 토큰 받았고 로그인됐으니 메인으로 화면 전환시켜줌
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("소셜로그인 에러", error);
        window.alert("로그인에 실패하였습니다.");
        // 로그인 실패하면 로그인 화면으로 돌려보냄
        window.location.replace("/login");
      });
  };
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

//로그아웃
export const __logout = createAsyncThunk(
  "members/__logout",
  async (payload, thunkAPI) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER}/api/logout`, {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
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
  },
});

export default LoginSlice.reducer;
