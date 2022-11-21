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
            <h3>마이페이지</h3>
            <img
              onClick={mypageupdate}
              style={{ width: 25, height: 25 }}
              src={settings}
            />
          </Head>
          <div>
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
            <UserInfo>
              <div>{user.nickname}</div>
              <Email>{user.email}</Email>
            </UserInfo>
          </div>
          <br />
          <hr />
          <SecondContainer>
            <div>
              <Content onClick={mypost}>
                <img src={window} /> 내가 올린 게시글
              </Content>
            </div>
            <div>
              <Content onClick={myobjection}>
                <img src={doubletick} /> 이의제기
              </Content>
            </div>
            <div>
              <Content onClick={mylike}>
                <img src={bookmark} /> 찜목록
              </Content>
            </div>
          </SecondContainer>
        </FirstContainer>
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
`;

const UserInfo = styled.div`
  padding: 10px;
  margin-left: 50px;
`;

const Email = styled.div`
  color: gray;
  font-size: 12px;
`;

// 나의 활동
const Content = styled.div`
  margin-bottom: 10px;
  img {
    vertical-align: bottom;
  }
`;

const SecondContainer = styled.div``;
