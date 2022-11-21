import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import doubletick from "../assets/doubletick.png";
import home from "../assets/home.png";
import plus from "../assets/plus.png";
import search from "../assets/search.png";
import user from "../assets/user.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MenuBar>
        <div onClick={() => navigate("/")}>
          <div>
            <img src={home} />
          </div>
          <div>홈</div>
        </div>
        <div onClick={() => navigate("/postread/all/postId")}>
          <div>
            <img src={search} />{" "}
          </div>
          <div>검색</div>
        </div>
        <div onClick={() => navigate("/pricingInput")}>
          <div>
            <img src={plus} />{" "}
          </div>
          <div>가격측정</div>
        </div>
        <div onClick={() => navigate("/objectionread/all/issuesId")}>
          <div>
            <img src={doubletick} style={{ width: 30, height: 30 }} />{" "}
          </div>
          <div> 이의제기 </div>
        </div>
        <div onClick={() => navigate("/mypage")}>
          <div>
            <img src={user} />
          </div>
          <div>마이페이지</div>
        </div>
      </MenuBar>
    </div>
  );
};

export default Footer;

// 메뉴바
const MenuBar = styled.div`
background-color : gray;
width : 375px;
max-width: 88%;
height: 45px;
display: flex;
justify-content: space-between;
font-size : 10px;
text-align: center;
position : absolute;
bottom: -8px;
margin : auto;
align-items: center;
padding : 15px;
`
