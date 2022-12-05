import React, { useEffect } from "react";
import Layout from "../../components/commons/Layout";
import LOGOWHITE from "../../assets/LOGOWHITE.png";
import { useNavigate } from "react-router-dom";
const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/onboarding1`);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center content-center h-[100vh] bg-CC">
          <div className="flex-col">
            <div className="text-sm text-white flex justify-center">
              네고말고 이거!
            </div>
            <img className="w-36 h-8" src={LOGOWHITE} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Splash;
