import React, {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from "../hook/useInput";
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import photoIMG from "../assets/photoIMG.png"
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import {__UserProfileEdit} from '../redux/modules/LoginSlice'


const MypageUpdate = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [photo, setPhoto] = useState(null);
  // 사진을 저장하는 로직이 없었다.

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setPhoto(file)
    }
  };
  const [write, setWrite, writeHandle] = useInput({
    nickname : "",
  });
  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate("/mypage")
  }
const dispatch = useDispatch()
// const {profile} = useSelector((state) => state.login)

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

const nicknameEdit = () => {
  // 백엔드와 협의 필요
  // const formData = new FormData();
  // formData.append("nickname", write.nickname);
  // formData.append("profileImage", photo)
  // const Fdata = {formData: formData};
  // dispatch(__UserProfileEdit(Fdata));
  //  setEdit(false);
}

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      {/* 아래 내용만 데이터 받으면 div를 사진으로 바꿔서 사용할 것 */}
      <div
        style={{
          height: "200px",
          width: "200px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "200px",
            height: "200px",
            position: "absolute"
          }}
        />
      </div>
      프로필 사진을 바꾸시려면 눌러주세요
      <input size='medium' style={{ marginTop: '20px' }} onChange={writeHandle} name='nickname' value={write.nickname || ""}  placeholder='변경하실 닉네임을 입력하세요' />
      <div>
        <button onClick={nicknameEdit}>변경</button>
        <button onClick={onClickHandler}>이전으로</button>
      </div>
      <Header /> 
    </div>
  );
}

export default MypageUpdate