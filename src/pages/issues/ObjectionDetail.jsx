import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deleteObjection } from "../../redux/modules/ObjectionsSlice";
import {
  __CartInObjection,
  __CartOutObjection,
  __getObjectionDetail,
} from "../../redux/modules/ObjectionDetailsSlice";
import Layout2 from "../../components/commons/Layout2";
import { __CreateRoom } from "../../redux/modules/ChattingSlice";
import { swichFooterState } from "../../redux/modules/PostsSlice";
import blueBackArrow from "../../assets/pictures/detail/blueBackArrow.svg";
import blueHome from "../../assets/pictures/detail/blueHome.svg";
import blueToggle from "../../assets/pictures/detail/blueToggle.svg";
import whiteComment from "../../assets/pictures/detail/whiteComment.png";
import rightTriangle from "../../assets/pictures/detail/rightTriangle.svg";
import bookmarkD from "../../assets/pictures/detail/bookmarkD.png";
import bookmarkDwhite from "../../assets/pictures/detail/bookmarkDwhite.png";

const ObjectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.objectionDetails);

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
    }
  };

  //홈 이동
  const onClickGoHome = (data) => {
    dispatch(swichFooterState(data.state));
    navigate(`${data.navi}`);
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
  }, [post.updateComment, params]);

  const onSellerPage = () => {
    navigate(`/sellerpage/${post.memberId}`);
  };

  // 케러셀
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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

  useEffect(() => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Layout2>
        <div className=" relative flex-col h-[410px] w-[375px]">
          <div className="bg-white flex relative h-[60px] items-center justify-center z-10">
            <img
              className="cursor-pointer h-[35px] w-[35px] absolute  left-3"
              src={blueBackArrow}
              onClick={() => navigate(-1)}
            />
            <img
              className="cursor-pointer h-[35px] w-[35px] absolute left-12"
              src={blueHome}
              onClick={() => onClickGoHome({ state: "Home", navi: "/main" })}
            />
            {post.myIssue === true && (
              <img
                className="cursor-pointer h-[28px] w-[28px] absolute right-0"
                src={blueToggle}
                onClick={editToggleHandler}
              />
            )}
          </div>
          {editTg.isEdit === true && (
            <div
              className="fixed top-0 left-0 bg-black bg-opacity-50 z-20 w-full h-full flex justify-center items-center font-semibold"
              onClick={editToggleHandler}
            >
              <div className=" absolute bottom-0  z-30 w-full max-w-[375px] flex-col">
                <div className="w-full flex px-[18px]">
                  <div
                    className="hover:bg-CC cursor-pointer bg-white w-full h-14 rounded-lg flex justify-center items-center"
                    onClick={() => navigate(`/postupdate/${params.id}`)}
                  >
                    수정
                  </div>
                </div>
                <div className="w-full flex py-2 px-[18px]">
                  <div
                    className="hover:bg-CC cursor-pointer bg-white w-full h-14 rounded-lg flex justify-center items-center"
                    onClick={() => {
                      onDeleteHandler(params.id);
                    }}
                  >
                    삭제
                  </div>
                </div>
                <div className="w-full flex bg-CC py-2 px-[18px]">
                  <div
                    className="hover:bg-black hover:text-white cursor-pointer bg-white w-full h-14 my-1 rounded-lg flex justify-center items-center"
                    onClick={editToggleHandler}
                  >
                    닫기
                  </div>
                </div>
              </div>
            </div>
          )}

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
            <div className="bg-F6 bg-opacity-50 rounded-full flex-col  absolute z-10 right-4 bottom-0 ">
              <div className="rounded-full  bg-CC border-CC border-[1px] flex justify-center items-center h-7 w-7">
                <img
                  className="cursor-pointer h-5 w-5 "
                  src={bookmarkDwhite}
                  onClick={() => onCartButton(post.issuesId)}
                />
              </div>
              <div className="text-center text-sm text-CC">{post.likeCnt}</div>
            </div>
          ) : (
            <div className="bg-F6 bg-opacity-50 rounded-full flex-col absolute z-10 right-4 bottom-0 ">
              <div className="rounded-full bg-white  flex justify-center items-center h-7 w-7">
                <img
                  className="cursor-pointer h-5 w-5 "
                  src={bookmarkD}
                  onClick={() => onCartButton(post.issuesId)}
                />
              </div>
              <div className="text-center text-sm text-CC ">{post.likeCnt}</div>
            </div>
          )}
        </div>
        <div className="bg-white relative flex-col grow rounded-t-3xl z-10 mt-5">
          <div className=" h-[77px] rounded-t-3xl border-b-[1px] border-D9 flex p-[18px] justify-between">
            <div
              className="items-center flex cursor-pointer"
              onClick={onSellerPage}
            >
              <img
                className="w-[46px] h-[46px] rounded-full object-cover"
                src={post.avatarUrl}
              />
              <div className="ml-2 text-sm font-semibold">{post.nickname}</div>
            </div>
            <div
              className="bg-CC text-white text-sm p-3 rounded-md cursor-pointer flex items-center "
              onClick={() => {
                navigate("/pricingtext", { state: post });
              }}
            >
              상품 상세 정보
            </div>
          </div>

          <div className="  flex-col relative ">
            {post.options !== undefined && (
              <div className=" flex text-xs px-[18px] items-stretch my-3 text-CC mt-3">
                <div className="p-1 px-2 bg-EB bg-opacity-50 rounded-xl mr-1">
                  {post.options.category}
                </div>
                <div className="p-1 px-2 bg-EB bg-opacity-50 rounded-xl mr-1">
                  {post.options.model}
                </div>
                <div className="p-1 px-2 bg-EB bg-opacity-50 rounded-xl mr-1">
                  {post.options.years}
                </div>
                <div className="p-1 px-2 bg-EB bg-opacity-50 rounded-xl mr-1">
                  {post.options.options}
                </div>
              </div>
            )}
            <div className="ml-1 px-[18px] font-semibold">{post.title}</div>
            <div className="ml-1 p-[18px] text-sm">{post.content}</div>
            <div className=" min-h-96 h-96" />
          </div>
        </div>

        <div className="absolute bottom-0 bg-CC flex w-full h-[75px] justify-between z-10 items-center px-[18px] text-white">
          <div className=" absolute bottom-24">
            <div className=" font-medium text-xs text-DD">{post.createdAt}</div>
          </div>

          <div className=" flex items-center">
            {post.expectPrice !== undefined && (
              <div className="w-[90px]">
                <div className="text-[12px] text-translucent5">책정가격</div>
                <div>{post.expectPrice.toLocaleString("ko-KR")}원</div>
              </div>
            )}
            <img className=" px-1 mr-1 py-6" src={rightTriangle} />
            {post.userPrice !== undefined && (
              <div className="  w-[120px] flex-col">
                <div className="text-[12px] text-translucent5">판매가격</div>
                <div>{post.userPrice.toLocaleString("ko-KR")}원</div>
              </div>
            )}
          </div>

          <div className=" flex mt-1 w-[70px] justify-end">
            <div className="  flex-col w-6 text-[10px] text-translucent3   ">
              <img
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/objectionComment/${params.id}`);
                }}
                src={whiteComment}
              />
              <div>댓글</div>
            </div>
          </div>
        </div>
      </Layout2>
    </>
  );
};

export default ObjectionDetail;
