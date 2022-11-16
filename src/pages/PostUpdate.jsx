import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { __editPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImageUpload from "../hook/useImageUpload";
import { useSelector } from "react-redux";
import PricingText from "../components/PricingText";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer"

const PostUpdate = () => {
  const paramId = useParams();
  const dispatch = useDispatch();
  const [files, fileUrls, uploadHandle] = useImageUpload(5, true, 0.3, 1000);
  const imgRef = useRef();
  const posts = useSelector((state) => state.details.posts);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(posts);

  const updateSubmit = () => {
    //request로 날릴 폼데이터
    const formData = new FormData();
    //폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("multipartFiles", file);
      });
    } else {
      formData.append("multipartFiles", null);
    }

    // 폼 데이터에 글작성 데이터 넣기
    const objects = {
      title: updateInput.title,
      category: updateInput.category,
      expectPrice: updateInput.expectPrice,
      userPrice: updateInput.userPrice,
      content: updateInput.content,
    };
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );

    const obj = {
      id: paramId.id,
      formData: formData,
    };
    //Api 날리기
    dispatch(__editPost(obj));
  };

  return (
    <div>
      <Layout>
      <PricingText Data={posts} />

      <div>
        title:
        <input
          onChange={updateInputHandle}
          name="title"
          value={updateInput.title || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
        content
        <input
          onChange={updateInputHandle}
          name="content"
          value={updateInput.content || ""}
          type="text"
          placeholder="내용을 입력하세요."
        />
        <label htmlFor="imgFile">
          {fileUrls.length > 0 ? (
            <div>
              {
                /*previews*/
                fileUrls.map((val, i) => {
                  return <img src={val} key={i} />;
                })
              }
            </div>
          ) : (
            <div>
              {updateInput.images &&
                updateInput.images.map((item) => {
                  return <img src={item.imgUrl} />;
                })}
            </div>
          )}

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
        판매가격:
        <input
          onChange={updateInputHandle}
          name="userPrice"
          value={updateInput.userPrice || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
        <button onClick={updateSubmit}>글 수정</button>
      </div>
      <Footer/>
      </Layout>
    </div>
  );
};

export default PostUpdate;
