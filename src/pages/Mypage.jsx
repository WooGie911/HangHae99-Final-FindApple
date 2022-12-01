import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { __UserProfile } from "../redux/modules/LoginSlice";
import ChatList from "../pages/chatting/element/ChatList";
import photoIMG from "../assets/photoIMG.png";
import Layout from "../components/Layout";
import bookmark from "../assets/bookmark.png";
import doubletick from "../assets/doubletick.png";
import window from "../assets/window.png";
import Footer from "../components/Footer";
import LogoutButton from "../components/LogoutButton";
import chat from "../assets/chat.png";



const Mypage = () => {
  const navigate = useNavigate();
  const params = useParams();
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
  }, [params]);


// 채팅 modal창 상태 관리
const [isChatModal, setIsChatModal] = useState(false);
const popupPostCode = () => {
  setIsChatModal(!isChatModal)
}
  return (
    <div>
      <Layout>
        <FirstContainer>
          <Head>
            <div>내 정보</div>

            <LogoutButton />
          </Head>
          <div style={{ alignItems: "center" }}>
            <img
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                float: "left",
              }}
              src={
                user.profileImg == (null || undefined)
                  ? photoIMG
                  : user.profileImg
              }
            />
            <UserInfoContainer>
              <UserInfo>
                <div>{user.nickname}</div>
                <Email>{user.email}</Email>
              </UserInfo>
              <img
                onClick={mypageupdate}
                style={{ width: 25, height: 25 }}
                src="https://img.icons8.com/ios/25/null/forward--v1.png"
              />
            </UserInfoContainer>
          </div>
          <br />

          <SecondContainer>
            <span>나의 활동</span>
            <div>
              <Content>
                <span>
                  <img src={window} />
                  내가 올린 게시글
                </span>
                <img
                  onClick={mypost}
                  src="https://img.icons8.com/ios/25/null/forward--v1.png"
                />
              </Content>
            </div>
            <div>
              <Content>
                <span>
                  <img src={doubletick} />
                  이의제기
                </span>{" "}
                <img
                  onClick={myobjection}
                  src="https://img.icons8.com/ios/25/null/forward--v1.png"
                />
              </Content>
            </div>
            <div>
              <Content>
                <span>
                  <img src={bookmark} />
                  찜목록
                </span>
                <img
                  onClick={mylike}
                  src="https://img.icons8.com/ios/25/null/forward--v1.png"
                />
              </Content>
            </div>
          </SecondContainer>
        </FirstContainer>
        <ChatButton onClick={popupPostCode}><img src={chat}/>채팅</ChatButton>
        {isChatModal && (
        <ModalWrap onClick={popupPostCode}>
        <ChatList />
        </ModalWrap>
        )}
        <Footer />
      </Layout>
    </div>
  );
};

export default Mypage;

// 첫 박스
const FirstContainer = styled.div`
  padding: 20px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 18px;
  }
  margin-bottom: 40px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    margin-top: 17px;
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  padding: 10px;
`;

const Email = styled.div`
  color: gray;
  font-size: 12px;
`;

// 나의 활동
const Content = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  img {
    vertical-align: bottom;
    cursor: pointer;
  }
  div {
    font-size: 16px;
    img {
      margin-right: 10px;
    }
  }
`;

const SecondContainer = styled.div`
  span {
    font-size: 14px;
    font-weight: bold;
  }
  div {
    padding: 5px;
  }
  margin: auto;
  padding: 7px;
  border: none;
  width: 329px;
  height: 203px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
`;

// modal 버튼
const ChatButton = styled.button`
width: 79px;
height: 45px;
background: #3D6AF2;
border-radius: 30px;
position : fixed;
bottom: 70px;
right : 10px;
`
// modal 닫기
const ModalWrap=styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.4);
display: flex;
justify-content: center;
align-items: center;
z-index: 998;
padding: 0 15px;
box-sizing: border-box;
`