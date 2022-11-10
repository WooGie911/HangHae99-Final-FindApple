import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { __addPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PricingInput from "./PricingInput";

const PostsCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [write, setWrite, writeHandle] = useInput({
    title: "",
    category: "",
    image: "",
    expectPrice: "",
    userprice: "",
    product: "",
    content: "",
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.3, 1000);

  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();

  //submit
  const writeSubmit = () => {
    //request로 날릴 폼데이터
    const formData = new FormData();

    //폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("images", write.image);
      });
    } else {
      formData.append("images", null);
    }

    //폼 데이터에 글작성 데이터 넣기
    formData.append(
      "post",
      JSON.stringify({
        content: write.content,
        title: write.title,
      })
    );
    //나중에 안되면 바꿔야됨*****************

    //Api 날리기
    dispatch(__addPost(formData));
    //navigate("/PostRead");
    console.log("폼데이터", write);
  };

  return (
    <div>
      <PricingInput />

      <div>
        title:
        <input
          onChange={writeHandle}
          name="title"
          value={write.title || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
        content
        <input
          onChange={writeHandle}
          name="content"
          value={write.content || ""}
          type="text"
          placeholder="내용을 입력하세요."
        />
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
          <button
            type="button"
            onClick={() => {
              imgRef.current.click();
            }}
          >
            이미지 업로드 버튼
          </button>
        </label>
        <div className="preview">
          {
            /*previews map쓸곳*/
            fileUrls.map((val, i) => {
              return <img src={val} key={i} />;
            })
          }
        </div>
        <button onClick={writeSubmit}>글 작성</button>
      </div>
    </div>
  );
};

export default PostsCreate;
