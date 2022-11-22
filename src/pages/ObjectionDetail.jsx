import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deleteObjection } from "../redux/modules/ObjectionsSlice";
import photoIMG from "../assets/photoIMG.png";
import {
  __CartInObjection,
  __CartOutObjection,
  __getObjectionDetail,
} from "../redux/modules/ObjectionDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";

const ObjectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.objectionDetails);
  console.log("이슈 포스트 뭐 들어왔나 변수명(id)", post);
  //찜하기
  const onCartButton = (payload) => {
    {
      post.isLike
        ? dispatch(__CartOutObjection(payload))
        : dispatch(__CartInObjection(payload));
    }
  };

  //이의제기 게시글 삭제
  const onDeleteHandler = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteObjection(payload));
      window.location.replace("/objectionread/all");
    }
  };

  const [editTg, setEidtTg] = useState({
    isEdit: false,
  });

  const editToggleHandler = () => {
    const newEdit = {
      isEdit: !editTg.isEdit,
    };
    setEidtTg(newEdit);
  };

  useEffect(() => {
    dispatch(__getObjectionDetail(params.id));
  }, [params]);

  useEffect(() => {
    dispatch(__getObjectionDetail(params.id));
  }, [post.updateComment]);

  const onSellerPage = () => {
    navigate(`/sellerpage/${post.memberId}`)
  }

  return (
    <>
      <Layout>
        <EditHead>
          <div>
            <img
              onClick={() => {
                navigate(-1);
              }}
              style={{ width: 25, height: 25 }}
              src={back}
            />
          </div>
          <Tgbutton onClick={editToggleHandler}>···</Tgbutton>
          {editTg.isEdit === true ? (
            <ToggleNav>
              <Button onClick={() => navigate(`/objectionupdate/${params.id}`)}>
                수정
              </Button>
              <Button
                onClick={() => {
                  onDeleteHandler(params.id);
                }}
              >
                글삭제
              </Button>
            </ToggleNav>
          ) : null}
        </EditHead>
        <div>
          {post.images !== undefined &&
            post.images.map((item, index) => {
              return <Image src={item.imgUrl} key={index} />;
            })}
        </div>
        <WriterContainer>
          <div>
            <SellerProfile>
            <div><img
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                float: "left",
              }}
              src={
                post.avatarUrl == (null || undefined)
                  ? photoIMG
                  : post.avatarUrl
              }
            /></div>
            <Nickname onClick={onSellerPage}>
            {post.nickname}
            </Nickname>
            </SellerProfile>
          </div>
          <ClickHeart onClick={() => onCartButton(post.postId)}>
            {post.isLike ? "❤️" : "🤍"}{" "}
          </ClickHeart>
        </WriterContainer>
        <hr />
        <h3>{post.title}</h3>
        {post.options !== undefined &&
        (
         <>
          <Models>{post.options.category} / {post.options.model} / {post.options.years} / {post.options.options}</Models>
         </> 
        )
        }
        


        <div>{post.content}</div>

        

        <Heart>
            <div>
              <img src="https://img.icons8.com/ios-glyphs/15/null/hearts.png" />{" "}
              {post.likeCnt}
            </div>
            <div> {post.createdAt}</div>
        </Heart>
        <Detail onClick={() => {
              navigate("/pricingtext", { state: post });
            }}>
          <p5>상품 상세 정보</p5>
          <Stdetailrightarrow
            src="https://img.icons8.com/ios-glyphs/30/null/chevron-right.png"
          ></Stdetailrightarrow>
        </Detail>

        <Price>
          <div>
            <TextDiv>책정가격</TextDiv>
            <PriceDiv>{post.expectPrice}원</PriceDiv>
          </div>
          <Arrow>
            {" "}
            <img src="https://img.icons8.com/metro/15/null/long-arrow-right.png" />{" "}
          </Arrow>
          <div>
            <TextDiv>판매가격</TextDiv>
            <PriceDiv>{post.userPrice}원</PriceDiv>
          </div>
          <div>
            <img
              onClick={() => {
                navigate(`/postComment/${params.id}`);
              }}
              src="https://img.icons8.com/ios/25/null/topic.png"
            />
            <TextDiv>댓글</TextDiv>
          </div>
        </Price>
      </Layout>
    </>
  );
};

export default ObjectionDetail;

// 수정 삭제 토글 및 뒤로가기
const EditHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Tgbutton = styled.button`
  border: none;
  font-weight: 600;
  width: 50px;
  background-color: white;
`;
const ToggleNav = styled.div`
  width: 50px;
  height: 80px;
  position: absolute;
  right: 10px;
  top: 50px;
`;
const Button = styled.button`
  width: 50px;
  height: 40px;
  margin-bottom: 3px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: red;
  }
`;

// 이미지 크기 지정
const Image = styled.img`
  width: 300px;
  height: 300px;
  margin: auto;
  margin-bottom: 20px;
  display: block;
`;

// 물건 가격
const Price = styled.div`
  border-top: 1px solid #d9d9d9;
  width: 367px;
  height: 86px;
  position: fixed;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  div {
    margin-right: 10px;
    padding-top: 10px;
  }
`;

const Arrow = styled.div`
  margin-top: 20px;
`;

const TextDiv = styled.div`
  font-size: 10px;
`;

const PriceDiv = styled.div`
  font-size: 16px;
`;

// 글쓴이 정보 및 하트
const WriterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// seller 프로필
const SellerProfile = styled.div`
display: flex;
`

const Nickname = styled.div`
cursor: pointer;
margin-top: 18px;
margin-left: 10px;
`

// 상품 측정 정도 확인
const Detail = styled.div`
  background-color: gray;
  cursor: pointer;
  position: fixed;
  width : 343px;
  height: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  margin : auto;
  margin-bottom: 20px;
  bottom : 90px;
  justify-content: space-between;
  padding: 10px;
`;

const Stdetailrightarrow = styled.img`
  position: relative;
  top: 0px;
  width: 25px;
  height: 25px;
`;

// 찜하기 파트
const Heart = styled.div`
  font-size: 12px;
  color : #606060;
  width: 367px;
  height: 86px;
  position: fixed;
  bottom: 90px;
  display: flex;
  div{
    margin-left: 15px;
  }
`

// 찜하기 버튼
const ClickHeart = styled.div`
margin-top: 13px;
`

// 기종 설명
const Models = styled.div`
font-size: 12px;
color : #000000;
margin-bottom: 10px;
`
