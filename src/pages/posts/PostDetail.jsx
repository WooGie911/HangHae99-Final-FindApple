import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../../redux/modules/PostsSlice";
import photoIMG from "../../assets/photoIMG.png";
import whitearrow from "../../assets/whitearrow.png";
import home from "../../assets/home.png";
import threedots from "../../assets/threedots.png";
import blueHeart from "../../assets/blueHeart.svg";
import emptyHeart from "../../assets/emptyHeart.svg";
import blueBackArrow from "../../assets/blueBackArrow.svg";
import blueHome from "../../assets/blueHome.svg";
import blueToggle from "../../assets/blueToggle.svg";

import {
  __CartInPost,
  __CartOutPost,
  __getPostDetail,
} from "../../redux/modules/PostDetailsSlice";
import { __CreateRoom } from "../../redux/modules/ChattingSlice";
import Layout from "../../components/commons/Layout";
import back from "../../assets/back.png";
import chat from "../../assets/chat.png";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.details);
  const postChat = useSelector((state) => state.chatting.createRoom);

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

  // 채팅방 개설

  useEffect(() => {
    localStorage.setItem("roomId", postChat);
  }, [postChat]);

  const onClickChatting = () => {
    dispatch(
      __CreateRoom({
        postId: post.postId,
      })
    );
    setTimeout(
      function () {
        // 만들어진 채팅방으로 이동하는 로직 => localStorage 활용한 방법 이용
        // 연결되었을 때 콜백함수 실행
        navigate(`/chatting/${localStorage.getItem("roomId")}`);
      },
      300 // 밀리초 간격으로 실행
    );
  };

  // 케러셀
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };

  // const onClickHandler = () => {
  //   navigate(-1);
  // };

  return (
    <>
      <Layout>
        <div className=" bg-bubble-gum relative flex-col h-[410px] w-[375px] z-10">
          <div className="bg-transparent flex relative h-[60px] items-center justify-center z-20">
            <img className="h-5 w-5 absolute  left-3" src={blueBackArrow} />
            <img
              className="h-[18px] w-[18px] absolute left-10"
              src={blueHome}
              onClick={() => navigate("/main")}
            />
            <img
              className="h-[18px] w-[18px] absolute right-4"
              src={blueToggle}
              onClick={editToggleHandler}
            />
          </div>
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

          <div className=" absolute top-0 z-0 w-full h-[446px]">
            <Slider {...settings}>
              {post.images !== undefined &&
                post.images.map((item, index) => {
                  return (
                    <img
                      className=" h-[446px] object-cover"
                      src={item.imgUrl}
                      key={index}
                    />
                  );
                })}
            </Slider>
          </div>

          {post.isLike ? (
            <div className="bg-transparent flex-col absolute z-10 right-4">
              <img src={blueHeart} onClick={() => onCartButton(post.postId)} />
              <div className="text-center text-sm text-CC">
                {post.likeCnt}
              </div>{" "}
            </div>
          ) : (
            <div className="bg-transparent flex-col absolute z-10 right-4 bottom-0">
              <img src={emptyHeart} onClick={() => onCartButton(post.postId)} />
              <div className="text-center text-sm text-white">
                {post.likeCnt}
              </div>
            </div>
          )}
        </div>
        <div className="bg-orange z-30 relative h-[450px] mt-5">
          <div className="bg-metal h-[77px]  rounded-t-3xl border-b-[1px] border-DD flex p-[18px] justify-between">
            <div
              className="bg-beige items-center flex cursor-pointer"
              onClick={onSellerPage}
            >
              <img
                className="w-[46px] h-[46px] rounded-full"
                src={
                  post.avatarUrl == (null || undefined)
                    ? photoIMG
                    : post.avatarUrl
                }
              />
              <div className="ml-2 text-sm font-semibold">{post.nickname}</div>
            </div>
            <button
              className="bg-CC text-white text-sm p-3 rounded-md"
              onClick={() => {
                navigate("/pricingtext", { state: post });
              }}
            >
              상품 상세 정보
            </button>
          </div>

          <div className=" bg-purple flex-col relative h-[350px]">
            {post.options !== undefined && (
              <div className=" bg-tahiti flex text-xs px-[18px] items-stretch my-3">
                <div className="p-1 bg-EB rounded-md mx-0.5">
                  {post.options.category}
                </div>
                <div className="p-1 bg-EB rounded-md mx-0.5">
                  {post.options.model}
                </div>
                <div className="p-1 bg-EB rounded-md mx-0.5">
                  {post.options.years}
                </div>
                <div className="p-1 bg-EB rounded-md mx-0.5">
                  {post.options.options}
                </div>
              </div>
            )}
            <div className=" bg-translucent px-[18px] font-semibold">
              {post.title}
            </div>
            <div className="  bg-CC p-[18px] text-sm">{post.content}</div>

            <div className=" bg-bubble-gum justify-between w-full px-[18px] absolute bottom-1 flex items-end">
              <div className=" font-medium text-xs text-OO">
                {post.createdAt}
              </div>

              <button
                className="w-[79px] h-[45px] right-0 bg-CC flex relative items-center justify-center rounded-3xl"
                onClick={onClickChatting}
              >
                <img src={chat} />
                <div className="ml-2 text-xs ">채팅</div>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 bg-CC flex w-full h-[75px]">
          <div>
            {post.expectPrice !== undefined && (
              <>
                <TextDiv>책정가격</TextDiv>
                <PriceDiv>
                  {post.expectPrice.toLocaleString("ko-KR")}원
                </PriceDiv>
              </>
            )}
          </div>
          <Arrow>
            {" "}
            <img src="https://img.icons8.com/metro/15/null/long-arrow-right.png" />{" "}
          </Arrow>
          <div>
            {post.userPrice !== undefined && (
              <>
                <TextDiv>판매가격</TextDiv>
                <PriceDiv>{post.userPrice.toLocaleString("ko-KR")}원</PriceDiv>
              </>
            )}
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
        </div>
      </Layout>
    </>
  );
};

export default PostDetail;

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

const Arrow = styled.div`
  margin-top: 20px;
`;

const TextDiv = styled.div`
  font-size: 10px;
`;

const PriceDiv = styled.div`
  font-size: 16px;
`;
