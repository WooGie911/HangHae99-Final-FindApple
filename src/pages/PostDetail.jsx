import React, { useEffect, useState, Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../redux/modules/PostsSlice";
import photoIMG from "../assets/photoIMG.png";
import whitearrow from "../assets/whitearrow.png";
import home from "../assets/home.png";
import threedots from "../assets/threedots.png";

import {
  __CartInPost,
  __CartOutPost,
  __getPostDetail,
} from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout";
import back from "../assets/back.png";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.details);
  console.log(post);

  //찜하기
  const onCartButton = (payload) => {
    {
      post.isLike
        ? dispatch(__CartOutPost(payload))
        : dispatch(__CartInPost(payload));
    }
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(payload));
      window.location.replace("/postread/all");
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
    dispatch(__getPostDetail(params.id));
    console.log("겟 포스트 디테일 내용", post);
  }, [params]);

  const onSellerPage = () => {
    navigate(`/sellerpage/${post.memberId}`);
  };

  // 케러셀

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Layout>
        <EditHead>
          <div>
            <Span>
              <img
                onClick={() => {
                  navigate(-1);
                }}
                style={{ width: 25, height: 25 }}
                src={back}
              />
              <span onClick={() => navigate("/")}>
                <img src={home} />
              </span>
            </Span>
          </div>
          <Tgbutton src={threedots} onClick={editToggleHandler} />
          {editTg.isEdit === true ? (
            <ToggleNav>
              <Button onClick={() => navigate(`/postupdate/${params.id}`)}>
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
          <Slider {...settings}>
            {post.images !== undefined &&
              post.images.map((item, index) => {
                return <Image src={item.imgUrl} key={index} />;
              })}
          </Slider>
        </div>
        <WriterContainer>
          <div>
            <SellerProfile>
              <div>
                <img
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
                />
              </div>
              <Nickname onClick={onSellerPage}>{post.nickname}</Nickname>
            </SellerProfile>
          </div>
          <ClickHeart onClick={() => onCartButton(post.postId)}>
            {post.isLike ? (
              <img src="https://img.icons8.com/emoji/25/null/blue-heart.png" />
            ) : (
              "🤍"
            )}{" "}
          </ClickHeart>
        </WriterContainer>
        <White>
          <Title>{post.title}</Title>
          {post.options !== undefined && (
            <>
              <Models>
                <span>{post.options.category}</span>{" "}
                <span>{post.options.model}</span>{" "}
                <span>{post.options.years}</span>{" "}
                <span>{post.options.options}</span>{" "}
              </Models>
            </>
          )}
          <div>{post.content}</div>

          <Heart>
            <div>
              <img src="https://img.icons8.com/ios-glyphs/15/null/hearts.png" />{" "}
              {post.likeCnt}
            </div>
            <div> {post.createdAt}</div>
          </Heart>
          <Detail
            onClick={() => {
              navigate("/pricingtext", { state: post });
            }}
          >
            <p5>상품 상세 정보</p5>
            <Stdetailrightarrow
              src={whitearrow}
              style={{ width: "25px", height: "25px" }}
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
        </White>
      </Layout>
    </>
  );
};

export default PostDetail;

// 수정 삭제 토글 및 뒤로가기
const EditHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Span = styled.span`
  span {
    margin-left: 10px;
  }
`;

const Tgbutton = styled.img`
  width: 23px;
  height: 23px;
`;
const ToggleNav = styled.div`
  width: 50px;
  height: 80px;
  position: absolute;
  right: 10px;
  top: 50px;
  z-index: 999;
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
  background-color: #3d6af2;
  color: white;
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
  img {
    filter: invert();
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
  margin-top: 30px;
  display: flex;
  background-color: white;
  border-radius: 15px 15px 0 0;
  justify-content: space-between;
  border-bottom: 0.5px solid lightgrey;
  padding-bottom: 10px;
`;

// seller 프로필
const SellerProfile = styled.div`
  display: flex;
`;

const Nickname = styled.div`
  cursor: pointer;
  margin-top: 18px;
  margin-left: 10px;
`;

// 흰배경
const White = styled.div`
  background: white;
  height: 80vh;
`;

// 타이틀
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

// 상품 측정 정도 확인
const Detail = styled.div`
  background-color: #3d6af2;
  cursor: pointer;
  color: white;
  position: fixed;
  width: 343px;
  height: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  bottom: 90px;
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
  color: #606060;
  width: 367px;
  height: 86px;
  position: fixed;
  bottom: 90px;
  display: flex;
  div {
    margin-left: 15px;
  }
`;

// 찜하기 버튼
const ClickHeart = styled.div`
  margin-top: 13px;
`;

// 기종 설명
const Models = styled.div`
  font-size: 12px;
  color: #000000;
  margin-bottom: 30px;
  span {
    border: 0.5px solid #3d6af2;
    color: #3d6af2;
    border-radius: 5px;
    padding: 3px;
  }
`;
