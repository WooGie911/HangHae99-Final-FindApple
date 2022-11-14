import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";

import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PricingInput from "./PricingInput";

const PostsCreate = (props) => {
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
  const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);

  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef();

  //submit
  const writeSubmit = () => {
    // request로 날릴 폼데이터
    const formData = new FormData();

    // 폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("multipartFiles", file);
      });
    } else {
      formData.append("multipartFiles", null);
    }

    // 폼 데이터에 글작성 데이터 넣기
    const objects = {
      title: write.title,
      category: write.category,
      expectPrice: 1000,
      userPrice: 2000,
      content: write.content,
    };
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
      // objects
    );

    //Api 날리기
    dispatch(props.__addData(formData));
    //navigate("/PostRead");
    console.log("폼데이터", formData);
    console.log("files", files);
    console.log("objects", objects);
  };

  return (
    <div>
      <PricingInput
        State={write}
        setState={setWrite}
        stateHandle={writeHandle}
      />

      <div>
        title:
        <input
          onChange={writeHandle}
          name="title"
          value={write.title || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
        content:
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
