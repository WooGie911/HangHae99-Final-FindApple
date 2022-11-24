import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "./Loading";
import { __kakaoLogout } from "../redux/modules/LoginSlice";

const RedirectLogout = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(__kakaoLogout());
  }, []);

  return <Loading />;
};

export default RedirectLogout;
