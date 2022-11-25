import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import doubletick from "../assets/doubletick.png";
import home from "../assets/home.png";
import blueplus from "../assets/blueplus.png";
import search from "../assets/search.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Footers>
      <MenuBar>
        <div onClick={() => navigate("/main")}>
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
            <img src={blueplus} />{" "}
          </div>
        </div>
        <div onClick={() => navigate("/objectionread/all/issuesId")}>
          <div>
            <img src={doubletick} style={{ width: 30, height: 30 }} />{" "}
          </div>
          <div> 이의제기 </div>
        </div>
        <div onClick={() => navigate("/mypage")}>
          <div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_681_575)">
                <path
                  d="M12.4999 11.4583C13.324 11.4583 14.1296 11.214 14.8148 10.7561C15.5 10.2983 16.0341 9.64754 16.3494 8.88618C16.6648 8.12482 16.7473 7.28705 16.5865 6.47879C16.4258 5.67054 16.0289 4.92811 15.4462 4.34539C14.8635 3.76267 14.121 3.36583 13.3128 3.20506C12.5045 3.04429 11.6668 3.12681 10.9054 3.44217C10.144 3.75754 9.4933 4.29159 9.03546 4.97679C8.57762 5.662 8.33325 6.46758 8.33325 7.29167C8.33325 8.39674 8.77224 9.45655 9.55364 10.2379C10.335 11.0193 11.3948 11.4583 12.4999 11.4583ZM12.4999 5.20833C12.912 5.20833 13.3148 5.33052 13.6574 5.55944C14 5.78836 14.267 6.11373 14.4247 6.49441C14.5824 6.87509 14.6236 7.29398 14.5432 7.69811C14.4628 8.10223 14.2644 8.47345 13.9731 8.76481C13.6817 9.05617 13.3105 9.25459 12.9064 9.33497C12.5022 9.41536 12.0833 9.3741 11.7027 9.21642C11.322 9.05874 10.9966 8.79171 10.7677 8.44911C10.5388 8.1065 10.4166 7.70371 10.4166 7.29167C10.4166 6.73913 10.6361 6.20923 11.0268 5.81853C11.4175 5.42783 11.9474 5.20833 12.4999 5.20833Z"
                  fill="black"
                />
                <path
                  d="M12.4999 13.5415C10.566 13.5415 8.71138 14.3097 7.34393 15.6772C5.97648 17.0446 5.20825 18.8993 5.20825 20.8332C5.20825 21.1094 5.318 21.3744 5.51335 21.5697C5.7087 21.7651 5.97365 21.8748 6.24992 21.8748C6.52619 21.8748 6.79114 21.7651 6.98649 21.5697C7.18184 21.3744 7.29159 21.1094 7.29159 20.8332C7.29159 19.4518 7.84032 18.1271 8.81707 17.1503C9.79382 16.1736 11.1186 15.6248 12.4999 15.6248C13.8813 15.6248 15.206 16.1736 16.1828 17.1503C17.1595 18.1271 17.7083 19.4518 17.7083 20.8332C17.7083 21.1094 17.818 21.3744 18.0133 21.5697C18.2087 21.7651 18.4737 21.8748 18.7499 21.8748C19.0262 21.8748 19.2911 21.7651 19.4865 21.5697C19.6818 21.3744 19.7916 21.1094 19.7916 20.8332C19.7916 18.8993 19.0234 17.0446 17.6559 15.6772C16.2885 14.3097 14.4338 13.5415 12.4999 13.5415V13.5415Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_681_575">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>내 정보</div>
        </div>
      </MenuBar>
    </Footers>
  );
};

export default Footer;

const Footers = styled.div`
  position: fixed;
  bottom: 0px;
`;
// 메뉴바
const MenuBar = styled.div`
  background-color: white;
  width: 375px;
  max-width: 100%;
  height: 58px;
  display: flex;
  justify-content: space-between;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: center;

  align-items: center;
`;