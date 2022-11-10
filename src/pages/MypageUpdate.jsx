import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import photoIMG from "../assets/photoIMG.png";
import Header from "../components/Header";

const MypageUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    navigate("/mypage");
  };

  const [write, setWrite, writeHandle] = useInput({
    nickname: "",
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImgUpload(1, true, 0.3, 1000);

  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();
  //submit
  const writeSubmit = () => {
    //request로 날릴 폼데이터
    const formData = new FormData();

    //폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append("images", null);
    }

    //폼 데이터에 글작성 데이터 넣기
    formData.append("post");
  };

  return (
    <div>
      <Header />
      <h1>회원 정보 수정</h1>
      <label htmlFor="imgFile">
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          id="imgFile"
          name="imgFile"
          multiple
          onChange={uploadHandle}
          ref={imgRef}
        />
        <StImgUploadBtn
          type="button"
          onClick={() => {
            imgRef.current.click();
          }}
        >
          <img
            src={photoIMG}
            style={{ width: "200px", marginTop: "10px" }}
          ></img>
          <div className="preview">
            {
              /*previews map쓸곳*/
              fileUrls.map((val, i) => {
                return <StPreviewImg src={val} alt="프로필 이미지" key={i} />;
              })
            }
          </div>
        </StImgUploadBtn>
      </label>
      <div>
        <Input
          size="large"
          onChange={writeHandle}
          name="nickname"
          value={write.nickname || ""}
          type="text"
          placeholder="닉네임을 변경하세요."
        />
      </div>
      <div>
        <button>변경완료</button>
        <button onClick={onClickHandler}>이전으로</button>
      </div>
    </div>
  );
};

export default MypageUpdate;

const StPreviewImg = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 1rem;
`;

const StImgUploadBtn = styled.button`
  border: none;
`;

const Input = styled.input`
  width: 200px;
`;
