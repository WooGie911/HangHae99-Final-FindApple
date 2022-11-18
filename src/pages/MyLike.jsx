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
                <div>
                  {like.image}
                  {like.title}
                </div>
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
