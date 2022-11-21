import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { __getSellerinfo } from "../redux/modules/SellerSlice";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";

const SellerPage = () => {
  const { myPostList, sellerInfoDto } = useSelector(
    (state) => state.sellerpage
  );
  console.log(myPostList);
  const navigate = useNavigate();
  const { memberId } = useParams();
  // params, router 접근
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getSellerinfo(memberId));
  }, [memberId]);
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <div>
      <Layout>
      <HeadContainer>
      <div>
        <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
        <span>프로필</span>

      </div>
      </HeadContainer>
      <hr/>

        {sellerInfoDto !== undefined && (
          <>
            <SellerProfile>
            <div><img src={sellerInfoDto.profileImg} /></div>
            <Nickname>{sellerInfoDto.nickname}</Nickname>
            </SellerProfile>
            
          </>
        )}
        <div>
        <Title>{sellerInfoDto.nickname}님의 판매상품</Title>
          {myPostList.length > 0 && (
            <>
              {myPostList.map((mypost) => {
                return (
                  <SellerPost key={mypost.postId}>
                    <img src={mypost.images[0].imgUrl} />
                    <PostPrice>{mypost.userPrice}</PostPrice>
                    <PostTitle>{mypost.title}</PostTitle>
                    <LikeCnt>🤍{mypost.likeCnt}</LikeCnt>
                  </SellerPost>
                );
              })}
            </>
          )}
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default SellerPage;

//헤더
const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 120px;
  margin-bottom: 20px;
  img {
    float: left;
    margin-right : 130px;
  }
  span {
    /* text-align: center; */
    font-size: 24px;
    font-weight: bold;
  }
`;


// 유저 정보
const SellerProfile = styled.div`
display: flex;
margin-right : 10px;
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
`
const Nickname = styled.div`
margin-top: 15px;
margin-left: 15px;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 19px;

color: #000000;
`

// 아이템
const Title = styled.div`
margin-top : 15px;
margin-bottom: 20px;
margin-left : 15px;
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


color: #000000;
`

const SellerPost = styled.div`
float: left;
margin-left: 20px;
img{
  margin: auto;
  position: relative;
display: flex;
width: 160px;
height: 160px;
border-radius: 5px;
}
`

const PostTitle = styled.div`

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;

color: #000000;
`
const PostPrice = styled.div`
width: 92px;
height: 17px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;


color: #000000;
`

const LikeCnt = styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 15px;
/* identical to box height */


color: #595959;
`