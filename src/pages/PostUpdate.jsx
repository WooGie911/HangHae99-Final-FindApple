import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { __editPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImageUpload from "../hook/useImageUpload";
import { useSelector } from "react-redux";
import PricingText from "../components/PricingText";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer"
import back from "../assets/back.png" 
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const PostUpdate = () => {
  const paramId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        
        <FirstContainer>
        <div><img onClick={()=> {navigate(-1)}} style={{width:25, height : 25}} src={back}/></div>
        <div>상품 게시물 수정</div>
        <EditButton onClick={updateSubmit}>완료</EditButton>
        </FirstContainer>
        <ImageWrapper>
        <label htmlFor="imgFile">
          {
          /*previews*/
          fileUrls.map((val, i) => {
          return <img src={val} key={i} />;
          })
          }
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
          <PhotoButton
            type="button"
            onClick={() => {
              imgRef.current.click();
            }}
          >
            <CameraImg>
            <div><img src="https://img.icons8.com/fluency-systems-regular/20/null/multiple-cameras.png"/></div>
            <div>{fileUrls.length}/5</div>
            </CameraImg>
          </PhotoButton>
        </label>
        </ImageWrapper>
        
      <div>
        title:
        <div>
        {updateInput.title}
        </div>
        content
        <PricingText Data={posts} />
        <PriceInput>
        판매가격:
        <input
          onChange={updateInputHandle}
          name="userPrice"
          value={updateInput.userPrice || ""}
          type="text"
          placeholder="판매 가격을 입력해주세요."
        />
        </PriceInput>
        <EditText>
        <textarea
          onChange={updateInputHandle}
          name="content"
          value={updateInput.content || ""}
          type="text"
          placeholder="수정할 내용을 입력하세요."
        />
        </EditText>

      </div>
      <Footer/>
      </Layout>
    </div>
  );
};

export default PostUpdate;

// 제목
const FirstContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 10px;
`
const EditButton = styled.div`
background-color: transparent;
cursor: pointer;
`

// 사진 업로드
const ImageWrapper = styled.div`
border: 1.2px solid gray;
border-width: 1.2px 0px 1.2px 0px ;
height : 60px;
`
const PhotoButton = styled.div`
width: 50px;
height: 50px;
border-radius: 25%;
background-color: aliceblue;
margin : 10px;
`

const CameraImg = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-top : 5px;
`

// 판매가격 및 내용입력
const PriceInput = styled.div`
border: 1.2px solid gray;
border-width: 1.2px 0px 1.2px 0px ;
height : 60px;
input{
  background-color: transparent;
  border: 1px solid transparent;
  width: 250px;

}
`

const EditText = styled.div`
border: 1.2px solid gray;
border-width: 1.2px 0px 1.2px 0px ;
height : 120px;
textarea{
  background-color: transparent;
  border: 1px solid transparent;
  width: 375px;
  height: 115px;

}
`