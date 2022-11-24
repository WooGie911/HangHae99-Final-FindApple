export const {
  REACT_APP_KAKAO_REST_API_KEY,
  REACT_APP_KAKAO_REDIRECT_URI,
  REACT_APP_KAKAO_LOGOUT_REDIRECT_URI,
} = process.env;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REACT_APP_KAKAO_REST_API_KEY}&logout_redirect_uri=${REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
