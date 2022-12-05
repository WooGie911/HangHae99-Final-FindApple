import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hook/useInput";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { __UserProfileEdit } from "../../redux/modules/LoginSlice";
import photoIMG from "../../assets/photoIMG.png";
import Layout from "../../components/commons/Layout";
import back from "../../assets/back.png";

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

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  };

  const { user } = useSelector((state) => state.Login);
  const [write, setWrite, writeHandle] = useInput({
    nickname: user.nickname,
  });

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

  const onSubmitHandler = () => {
    imageUploader.current.click();
  };

  const nicknameEdit = () => {
    const formData = new FormData();
    formData.append("image", photo);
    const obj = {
      nickname: write.nickname,
    };
    formData.append(
      "myInfoRequestDto",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    );
    dispatch(__UserProfileEdit(formData));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Layout>
        <HeadContainer>
          <img
            onClick={onClickHandler}
            style={{ width: 25, height: 25 }}
            src={back}
          />
          <span>내 정보</span>
          <EditButton onClick={nicknameEdit}>변경</EditButton>
        </HeadContainer>
        <ProfileEdit>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none",
            }}
          />
          <div>
            <img
              src={
                user.profileImg == (null || undefined)
                  ? photoIMG
                  : user.profileImg
              }
              ref={uploadedImage}
              style={{
                height: "75px",
                width: "75px",
                border: "1px dashed black",
                borderRadius: "50%",
              }}
              onClick={onSubmitHandler}
            />
          </div>
          <span>프로필 사진 바꾸기</span>
          <EditContainer>
            <span>닉네임</span>
            <input
              size="medium"
              onChange={writeHandle}
              name="nickname"
              value={write.nickname || ""}
            />
          </EditContainer>
        </ProfileEdit>
        <br />
      </Layout>
    </div>
  );
};

export default MypageUpdate;

//Head 파트

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 18px;
  }
  margin-bottom: 40px;
`;
const EditButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
`;

// ProfileEdit 파트

const ProfileEdit = styled.div`
  justify-content: center;
  text-align: center;
  input {
    border-radius: 25px;
    border: 1px solid transparent;
    padding: 10px;
  }
  img {
    margin-bottom: 15px;
  }
  span {
    color: #4d5e9b;
  }
`;

const EditContainer = styled.div`
  padding: 15px;
  input {
    display: flex;
    width: 333px;
    height: 38x;
    align-items: center;
    justify-content: center;
    align-content: center;
    border: 0.5px transparent gray;
    border-radius: 5px;
    margin-top: 10px;
  }
  span {
    margin-right: 280px;
  }
`;
