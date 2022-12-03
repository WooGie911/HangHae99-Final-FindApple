import axios from "axios";

const noToken = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  //process.env.REACT_APP_URL,
  withCredentials: true,
});

const token = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  //process.env.REACT_APP_URL,
  headers: {
    Access_Token:
      localStorage.getItem("Access_Token") === undefined
        ? ""
        : localStorage.getItem("Access_Token"),
    // Refresh_Token:
    //   localStorage.getItem("Refresh_Token") === undefined
    //     ? ""
    //     : localStorage.getItem("Refresh_Token"),
  },
  withCredentials: true,
});

const file = axios.create({
  // 추후에 로컬에서 서버 주소로 변경해야 함
  baseURL: process.env.REACT_APP_SERVER,
  //process.env.REACT_APP_URL,
  headers: {
    enctype: "multipart/form-data",
    Access_Token:
      localStorage.getItem("Access_Token") === undefined
        ? ""
        : localStorage.getItem("Access_Token"),
    // Refresh_Token:
    //   localStorage.getItem("Refresh_Token") === undefined
    //     ? ""
    //     : localStorage.getItem("Refresh_Token"),
  },
  withCredentials: true,
});

export const Apis = {
  getSellerInfoAX: (payload) => token.get(`api/myinfo/seller/${payload}`),

  getPriceInfoAX: (payload) => token.get(`/api/price/${payload}`),

  checkPriceAX: (payload) =>
    token.post(`/api/price/${payload.category}`, payload.Data),

  searchPostAX: (payload) =>
    token.get(
      `/api/posts/${payload.paramObj}/${payload.searchObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`
    ),

  getAddPostAX: (payload) =>
    token.get(
      `/api/posts/${payload.state.paramObj}?page=${payload.page}&size=${payload.state.pageSize}&sort=${payload.state.postSort},DESC`
    ),

  getPostAX: (payload) =>
    token.get(
      `/api/posts/${payload.paramObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`
    ),

  addPostAX: (payload) => file.post(`/api/posts`, payload),

  deletePostAX: (payload) => token.delete(`/api/posts/${payload}`),

  editPostAX: (payload) => token.patch(`/api/posts/${payload.id}`),

  getPostDetailAX: (payload) => token.get(`/api/posts/detail/${payload}`),

  addPostCommentAX: (payload) => token.post(`/api/posts/comment/${payload.id}`),

  deletePostCommentAX: (payload) =>
    token.delete(`/api/posts/comment/${payload}`),

  CartInPostAX: (payload) => token.post(`/api/posts/likes/${payload}`),

  CartOutPostAX: (payload) => token.delete(`/api/posts/likes/${payload}`),

  searchObjectionAX: (payload) =>
    token.get(
      `/api/issues/${payload.paramObj}/${payload.searchObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`
    ),

  getAddObjectionAX: (payload) =>
    token.get(
      `/api/issues/${payload.state.paramObj}?page=${payload.page}&size=${payload.state.pageSize}&sort=${payload.state.postSort},DESC`
    ),

  getObjectionAX: (payload) =>
    token.get(
      `/api/issues/${payload.paramObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`
    ),

  addObjectionAX: (payload) => file.post(`/api/issues`, payload),

  deleteObjectionAX: (payload) => token.delete(`/api/issues/${payload}`),

  editObjectionAX: (payload) => token.patch(`/api/issues/${payload.id}`),

  getObjectionDetailAX: (payload) => token.get(`/api/issues/detail/${payload}`),

  addObjectionCommentAX: (payload) =>
    token.post(`/api/issues/comment/${payload.id}`),

  deleteObjectionCommentAX: (payload) =>
    token.delete(`/api/issues/comment/${payload}`),

  CartInObjectionAX: (payload) => token.post(`/api/issues/likes/${payload}`),

  CartOutObjectionAX: (payload) => token.delete(`/api/issues/likes/${payload}`),

  getMyPostAX: () => token.get(`/api/myinfo/post`),

  getMyObjectionAX: () => token.get(`/api/myinfo/issue`),

  getMyLikeAX: () => token.get(`/api/myinfo/likes`),

  emailCheckAX: (payload) =>
    token.post(`/api/member/signup/mail-confirm`, payload),

  kakaoLoginAX: (code) => token.get(`/api/member/kakao?code=${code}`),

  SigninAX: (payload) => noToken.post(`/api/member/login`, payload),

  SignUpAX: (payload) => noToken.post(`/api/member/signup`, payload),

  UserProfileAX: () => token.get(`/api/myinfo`),

  UserProfileEditAX: (payload) => token.patch(`/api/myinfo/edit`, payload),

  // logoutAX: () => token.get(`/api/logout`),
};
export default Apis;
