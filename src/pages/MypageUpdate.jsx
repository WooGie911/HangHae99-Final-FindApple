import React, {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from "../hook/useInput";
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import photoIMG from "../assets/photoIMG.png"
import Header from "../components/Header"


const MypageUpdate = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

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
    }
  };

  const [write, setWrite, writeHandle] = useInput({
    nickname : "",
  });
  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate("/mypage")
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
      <Header /> 
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
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
        <button>변경</button>
        <button onClick={onClickHandler}>이전으로</button>
      </div>

    </div>
  );
}

export default MypageUpdate