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
        // 임시 : 정수님 코드 확인 필요
    email : "damin1@naver.com",
    nickname : "damin1",
    password : "damin1234",
  });
 

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

// const {user} = useSeletor((state) => state.Login)
// console.log(user)
//  const profileIMG = user.profileImg
//  const onSubmitHandler = () => {
//   imageUploader.current.click()
// }

const nicknameEdit = () => {
  // 백엔드와 협의 필요
  const formData = new FormData();
  formData.append("image", photo)
  const obj = {
    // 임시
    // 나중에 이미지 url을 받아서 뿌려야 함.
    email : write.email,
    nickname : write.nickname,
    password : write.password
  }
  formData.append(
    "memberReqDto",
    new Blob([JSON.stringify(obj)], {type : "application/json"})
  );
  dispatch(__UserProfileEdit(formData));
  //   navigate("/mypage")
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
      {/* <img src={ProfileIMG} style={{
          height: "200px",
          width: "200px",
          border: "1px dashed black",
          border-radius : "50%"
        }}
        onClick={onSubmitHandler} /> */}
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
