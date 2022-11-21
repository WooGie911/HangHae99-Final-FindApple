import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { __UserProfile } from "../redux/modules/LoginSlice";
import photoIMG from "../assets/photoIMG.png";
import Layout from "../components/Layout";
import bookmark from "../assets/bookmark.png";
import doubletick from "../assets/doubletick.png";
import window from "../assets/window.png";
import settings from "../assets/settings.png";
import Footer from "../components/Footer";

const Mypage = () => {
  const navigate = useNavigate();
  const mypageupdate = () => {
    navigate("/mypageupdate");
  };
  const mypost = () => {
    navigate("/mypost");
  };
  const myobjection = () => {
    navigate("/myobjection");
  };
  const mylike = () => {
    navigate("/mylike");
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Login);
  //get 해오기
  useEffect(() => {
    dispatch(__UserProfile());
  }, [dispatch]);
  return (
    <div>
          <Layout>
    <FirstContainer>
    <Head>
      <span>내 정보</span>
    </Head>
    <div style={{alignItems : "center"}}>
      <img style={{width:50, height : 50, borderRadius : '50%', float : 'left'}} src={user.profileImg == (null || undefined) ? photoIMG : user.profileImg}/>
      <UserInfoContainer>
        <UserInfo>
      <div>{user.nickname}</div>
      <Email>{user.email}</Email>
      </UserInfo>
      <img onClick={mypageupdate} style={{width:25, height : 25}} src="https://img.icons8.com/ios/25/null/forward--v1.png"/>
      </UserInfoContainer>
    </div>
    <br/>

    <SecondContainer>
      <span>
        나의 활동
      </span>
    <div>
    <Content> <span><img src={window}/>내가 올린 게시글</span><img onClick={mypost} src="https://img.icons8.com/ios/25/null/forward--v1.png"/></Content>
    </div>
    <div>
    <Content> <span><img src={doubletick}/>이의제기</span> <img onClick={myobjection}src="https://img.icons8.com/ios/25/null/forward--v1.png"/></Content>
    
    </div>
    <div>
    <Content> <span><img src={bookmark}/>찜목록</span> <img onClick={mylike} src="https://img.icons8.com/ios/25/null/forward--v1.png"/></Content>
    
    </div>
    </SecondContainer>
    
    </FirstContainer>
    <Footer/>
    </Layout>
    </div>
  )
}


export default Mypage;

// 첫 박스
const FirstContainer = styled.div`
  padding: 20px;
`;

const Head = styled.div`
span {
  font-size : 18px;
}
margin-bottom : 40px;
`

const UserInfoContainer = styled.div`
display: flex;
justify-content : space-between;
img {
  margin-top : 17px;
}
`

const UserInfo = styled.div`
padding: 10px;
`


const Email = styled.div`
  color: gray;
  font-size: 12px;
`;

// 나의 활동
const Content = styled.div`
margin-bottom: 10px;
display: flex;
justify-content: space-between;
img {vertical-align:bottom;}
span{
  font-size : 16px;
  img{
    margin-right : 10px;
  }
}
`

const SecondContainer = styled.div`
span{
  font-size: 14px;
  font-weight: bold;
}
div{
  padding : 5px;
}
margin : auto;
padding : 7px;
border : none;
width: 329px;
height: 203px;
background-color: white;
border-radius: 5px;
`

