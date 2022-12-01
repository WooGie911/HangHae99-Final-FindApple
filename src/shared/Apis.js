import axios from "axios";




const noToken = axios.create({
  // 추후에 로컬에서 서버 주소로 변경해야 함
  baseURL: process.env.REACT_APP_SERVER, 
  //process.env.REACT_APP_URL,
  withCredentials: true,
})

const token = axios.create({
  // 추후에 로컬에서 서버 주소로 변경해야 함
  baseURL:process.env.REACT_APP_SERVER, 
  //process.env.REACT_APP_URL,
  headers: {
    Access_Token:
      localStorage.getItem("Access_Token") === undefined
        ? ""
        : localStorage.getItem("Access_Token"),
  },
  withCredentials: true,
})

const file = axios.create({
  // 추후에 로컬에서 서버 주소로 변경해야 함
  baseURL:process.env.REACT_APP_SERVER,
  //process.env.REACT_APP_URL,
  headers: {
    enctype: "multipart/form-data",
    Access_Token:
      localStorage.getItem("Access_Token") === undefined
        ? ""
        : localStorage.getItem("Access_Token"),
  },
  withCredentials: true,
})

export const Apis = {

getSellerInfoAX: (payload) => token.get(`api/myinfo/seller/${payload}`),

getPriceInfoAX:(payload) => token.get(`/api/price/${payload}`),

checkPriceAX:(payload) => token.post( `/api/price/${payload.category}`,
payload.Data),

searchPostAX:(payload) => token.get(`/api/post/${payload.paramObj}/${payload.searchObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`),

getAddPostAX:(payload) => token.get(`/api/post/${payload.state.paramObj}?page=${payload.page}&size=${payload.state.pageSize}&sort=${payload.state.postSort},DESC`),

getPostAX:(payload) => token.get( `/api/post/${payload.paramObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`),

addPostAX:(payload) => token.post(`/api/post`, payload),

deletePostAX:(payload) => token.delete(`/api/post/${payload}`),

editPostAX:(payload) => token.patch( `/api/post/${payload.id}`),

getPostDetailAX:(payload) => token.get(`/api/post/detail/${payload}`),

addPostCommentAX:(payload) => token.post(`/api/post/comment/${payload.id}`),

deletePostCommentAX:(payload) => token.delete(`/api/post/comment/${payload}`),

CartInPostAX:(payload) => token.post(`/api/post/likes/${payload}`),

CartOutPostAX:(payload) => token.delete( `/api/post/likes/${payload}`),

searchObjectionAX:(payload) => token.get( `/api/issue/${payload.paramObj}/${payload.searchObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`),

getAddObjectionAX:(payload) => token.get(`/api/issue/${payload.state.paramObj}?page=${payload.page}&size=${payload.state.pageSize}&sort=${payload.state.postSort},DESC`),

getObjectionAX:(payload) => token.get(`/api/issue/${payload.paramObj}?page=${payload.pageNumber}&size=${payload.pageSize}&sort=${payload.postSort},DESC`),

addObjectionAX:(payload) => token.post(`/api/issue`, payload),

deleteObjectionAX:(payload) => token.delete(`/api/issue/${payload}`),

editObjectionAX:(payload)=> token.patch(`/api/issue/${payload.id}`),

getObjectionDetailAX:(payload) => token.get(`/api/issue/detail/${payload}`),

addObjectionCommentAX:(payload) => token.post(`/api/issue/comment/${payload.id}`),

deleteObjectionCommentAX:(payload) => token.delete(`/api/issue/comment/${payload}`),

CartInObjectionAX:(payload) => token.post( `/api/issue/likes/${payload}`),

CartOutObjectionAX:(payload) => token.delete( `/api/issue/likes/${payload}`),

getMyPostAX:() => token.get( `/api/myinfo/post`),

getMyObjectionAX:() => token.get(`/api/myinfo/issue`),

getMyLikeAX:() => token.get( `/api/myinfo/likes`),

emailCheckAX:(payload) => token.post( `/api/member/signup/mail-confirm`,payload),

kakaoLoginAX:(code) => token.get(`/api/member/kakao?code=${code}`),

SigninAX:(payload) => token.post(`/api/member/login`,payload),

SignUpAX:(payload) => token.post(`/api/member/signup`,payload),

UserProfileAX:() => token.get(`/api/myinfo`),

UserProfileEditAX:(payload) => token.patch(`/api/myinfo/edit`,payload),

logoutAX:() => token.get(`/api/logout`),


}
export default Apis