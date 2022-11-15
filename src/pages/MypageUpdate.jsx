import React, {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from "../hook/useInput";
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import {__UserProfileEdit} from '../redux/modules/LoginSlice'
import photoIMG from "../assets/photoIMG.png"


const MypageUpdate = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [photo, setPhoto] = useState(null);
  // 사진을 저장하는 로직이 없었다.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    navigate("/mypage");
  };

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
 

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

const {user} = useSelector((state) => state.Login)
 const onSubmitHandler = () => {
  imageUploader.current.click()
}

const nicknameEdit = () => {
  const formData = new FormData();
  formData.append("image", photo)
  const obj = {
    nickname : write.nickname,
  }
  formData.append(
    "myInfoRequestDto",
    new Blob([JSON.stringify(obj)], {type : "application/json"})
  );
  dispatch(__UserProfileEdit(formData));
    window.location.replace("/mypage")
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
      <div>
      <img src={user.profileImg == (null || undefined)  ? photoIMG : user.profileImg}
          ref={uploadedImage}
          style={{
          height: "200px",
          width: "200px",
          border: "1px dashed black",
          borderRadius : "50%"
        }}
        onClick={onSubmitHandler} />
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
