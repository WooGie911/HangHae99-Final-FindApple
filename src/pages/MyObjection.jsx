import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMyObjection } from "../redux/modules/MypageSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
const MyObjection = () => {
  const { objections } = useSelector((state) => state.mypage);
  console.log(objections);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyObjection());
  }, []);
  return (
    <div>
      <Layout>
        MyObjection
        {objections.length > 0 && (
          <>
            {objections.map((objection) => {
              return (
                <div>
                  {objection.image}
                  {objection.title}
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

export default MyObjection;
