import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { __getSellerinfo } from "../redux/modules/SellerSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

const SellerPage = () => {
  const { myPostList, sellerInfoDto } = useSelector(
    (state) => state.sellerpage
  );
  console.log(myPostList);
  const { memberId } = useParams();
  // params, router 접근
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getSellerinfo(memberId));
  }, [memberId]);
  return (
    <div>
      <Layout>
        {sellerInfoDto !== undefined && (
          <>
            <img src={sellerInfoDto.profileImg} />
            <div>판매자 닉네임</div>
            {sellerInfoDto.nickname}
            <div>판매자 이메일</div>
            {sellerInfoDto.email}
          </>
        )}
        <div>
          물건 리스트
          {myPostList.length > 0 && (
            <>
              {myPostList.map((mypost) => {
                return (
                  <div key={mypost.postId}>
                    <img src={mypost.images[0].imgUrl} />
                    <div>{mypost.title}</div>
                    {/* <div>{myPostList.product}</div> */}
                    <div>{mypost.userPrice}</div>
                  </div>
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
