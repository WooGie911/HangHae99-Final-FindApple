import React, { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"
import back from "../assets/back.png" 


const PostsCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { DetailPrice } = useSelector((state) => state.price);
  console.log("DetailPrice", DetailPrice);

  const [write, setWrite, writeHandle] = useInput({
    title: "",
    userprice: "",
    content: "",
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImgUpload(5, true, 0.5, 1000);
  const [imgUrls, setImgUrls] = useState([]);
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
      category: DetailPrice.category,
      expectPrice: DetailPrice.getPrice,
      userPrice: write.userPrice,
      content: write.content,
      option: { ...DetailPrice },
    };
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );

    //Api 날리기
    dispatch(props.__addData(formData));
    navigate(`${props.Navigate}`);
    console.log("폼데이터", formData);
    console.log("files", files);
    console.log("objects", objects);
  };
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <>
    <Layout>
      <Stcontainer>
        <Stuploadbutton>
        <div>
            <div><img onClick={onClickHandler} style={{width:25, height : 25}} src={back}/></div>
          </div>
          <div>
            <div>상품등록</div>
          </div>
          <div>
            <span onClick={writeSubmit}>완료</span>
          </div>
        </Stuploadbutton>
        <Stphotolabel htmlFor="imgFile">
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
          {fileUrls.length > 0 ? (
            <div className="preview">
              {
                /*previews*/
                fileUrls.map((val, i) => {
                  return (
                    <img
                      src={val}
                      key={i}
                      style={{ width: "100px", height: "100px" }}
                    />
                  );
                })
              }
            </div>
          ) : (
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
          )}
        </Stphotolabel>
        
      
        <div>
          <div>
            <Sttitleinput
              onChange={writeHandle}
              name="title"
              value={write.title || ""}
              type="text"
              placeholder="글제목"
            />
          </div>
          <hr/>

          <Detail
            onClick={() => {
              navigate("/pricingfinal");
            }}
          >
            상품 상세 정보
          </Detail>
          <hr/>

          <Price>
          <div>측정 가격 {DetailPrice.getPrice}</div>
          <hr/>
          <div>
          <input
            onChange={writeHandle}
            name="userPrice"
            value={write.userPrice || ""}
            type="text"
            placeholder="판매가격"
          />
          </div>
          </Price>
          <hr/>    
          <div>
            <Stcontentinput
              onChange={writeHandle}
              name="content"
              value={write.content || ""}
              type="text"
              placeholder="내용을 입력하세요."
            />
          </div>
        </div>
      </Stcontainer>
      </Layout>
    </>
  );
};

export default PostsCreate;

// 전체 페이지 레이아웃
const Stcontainer = styled.div`
  display: flex;
  flex-direction: column;
`;


// 상품 가격 측정
const Detail = styled.div`
cursor: pointer;
display: flex;
margin-top: 20px;
height: 30px;
color : gray;
font-size: 14px;

`
// 가격 결정
const Price = styled.div`
div{
margin-top: 30px;
color : gray;
font-size: 14px;
}
input{
  border : none;
  width: 98.5%;
  background-color : transparent;
}
`

const Stuploadbutton = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
  span{
    cursor: pointer;
  }
`;


// 내용 입력
const Stcontentinput = styled.textarea`
  margin-top: 25px;
  width: 98.5%;
  height: 30px;
  border : none;
  background-color : transparent;
`;


// 사진 업로드
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

// 사진 업로드 관련인 듯
const Stphotolabel = styled.label`
  border-bottom: 1px solid lightgrey;
  height: 150px;
  display: inline-block;
`;

const Sttitleinput = styled.input`
  width: 98.5%;
  height: 30px;
  border : none;
  background-color : transparent;
`