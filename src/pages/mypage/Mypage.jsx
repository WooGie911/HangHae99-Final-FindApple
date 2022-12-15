import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { __UserProfile } from "../../redux/modules/LoginSlice";
import bookmark from "../../assets/pictures/mypage/bookmark.svg";
import blackIssue from "../../assets/pictures/footer/blackIssue.svg";
import myPosts from "../../assets/pictures/mypage/myPosts.svg";
import LogoutButton from "../../components/login/LogoutButton";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import mypageArrow from "../../assets/pictures/mypage/mypageArrow.svg";

const Mypage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const mypageupdate = () => {
    navigate("/mypageupdate");
  };

  const onclickHandler = (data) => {
    navigate(data);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Login);
  //get 해오기
  useEffect(() => {
    dispatch(__UserProfile());
  }, [params]);

  useEffect(() => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Layout style={{ overflow: "hidden" }}>
      <div className=" flex justify-between items-center px-[18px] h-[76px]">
        <div className="text-[18px] font-semibold">내 정보</div>

        <LogoutButton />
      </div>
      <div
        className=" flex justify-between items-center p-5 cursor-pointer"
        onClick={mypageupdate}
      >
        <img
          className="h-[62px] w-[62px] rounded-full drop-shadow-xl object-cover"
          src={user.profileImg}
        />

        <div className=" flex-col mr-20  ">
          <div className=" font-semibold">{user.nickname}</div>
          <div className=" text-sm text-medium text-CC">{user.email}</div>
        </div>

        <img className=" cursor-pointer h-7 w-7" src={mypageArrow} />
      </div>

      <div className=" p-5 font-medium ">
        <div className="bg-white rounded-md drop-shadow-xl">
          <div className="bg-white p-3 pt-4 ml-3 mt-2 font-bold rounded-md">
            나의 활동
          </div>
          <div className="flex-col h-full content-center justify-center items-center p-1">
            <div
              className="flex relative ml-4 p-1 cursor-pointer"
              onClick={() => onclickHandler("/mypost")}
            >
              <img className="px-1 w-[26px] mr-1" src={myPosts} />
              <div>내가 작성한 게시물</div>
              <img className="absolute right-3 " src={mypageArrow} />
            </div>

            <div
              className="relative flex ml-4 p-1 my-3 cursor-pointer"
              onClick={() => onclickHandler("/myobjection")}
            >
              <img className="px-1 w-7 mr-[1px]" src={blackIssue} />
              <div>이의제기</div>
              <img className="absolute right-3" src={mypageArrow} />
            </div>

            <div
              className="flex relative ml-4 p-1 my-3 cursor-pointer"
              onClick={() => onclickHandler("/mylike")}
            >
              <img className="px-1 w-[25px] mr-1" src={bookmark} />
              <div>찜목록</div>
              <img className="absolute right-3" src={mypageArrow} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default Mypage;
