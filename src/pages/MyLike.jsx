import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyLike } from "../redux/modules/MypageSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
const MyLike = () => {
  const { likes } = useSelector((state) => state.mypage);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyLike());
  }, []);
  return (
    <div>
      <Layout>
        MyLike
        {likes.length > 0 && (
          <>
            {likes.map((like) => {
              return (
                <>
                  <br />
                  <img
                    src={like.images[0].imgUrl}
                    style={{ width: 50, height: 50 }}
                  />
                  <div>{like.category}</div>
                  <div>제목 : {like.title}</div>
                  <div>작성자 : {like.nickname}</div>
                  <br />
                </>
              );
            })}
          </>
        )}
        <Footer />
      </Layout>
    </div>
  );
};

export default MyLike;
