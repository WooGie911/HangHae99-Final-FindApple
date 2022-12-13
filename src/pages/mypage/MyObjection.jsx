import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyObjection } from "../../redux/modules/MypageSlice";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import backArrow from "../../assets/pictures/backArrow.svg";
import bookmark8D from "../../assets/pictures/bookmark8D.png";

const MyObjection = () => {
  const { objections } = useSelector((state) => state.mypage);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyObjection());
  }, []);
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <div className="bg-white flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-[1px] border-D9">
        <img
          className="cursor-pointer h-6 w-6 absolute  left-3"
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>내 이의제기</div>
      </div>

      <div className=" p-3 mt-5 grid grid-cols-2">
        {objections &&
          objections.map((objection) => {
            return (
              <div
                className="cursor-pointer bg-white p-2 mx-1 mt-2 rounded-md drop-shadow-lg"
                key={objection.issuesId}
                onClick={() => {
                  navigate(`/ObjectionDetail/${objection.issuesId}`);
                }}
              >
                <img
                  className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-md  "
                  src={objection.images[0].imgUrl}
                />
                <div className=" p-1">
                  <div>{objection.expectPrice.toLocaleString("ko-KR")}원</div>
                  <div className="text-sm  text-OO">{objection.title}</div>
                  <div className="flex text-xs items-center">
                    <img className="h-3" src={bookmark8D} />
                    <div className="ml-[1px] text-DD">{objection.likeCnt}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="h-16" />
      <Footer />
    </Layout>
  );
};

export default MyObjection;
