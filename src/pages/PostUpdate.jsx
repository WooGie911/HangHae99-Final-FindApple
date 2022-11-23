import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { __editPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImageUpload from "../hook/useImageUpload";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import whitearrow from "../assets/whitearrow.png";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [files, fileUrls, uploadHandle] = useImageUpload(5, true, 0.3, 1000);
  const imgRef = useRef();
  const { post } = useSelector((state) => state.details);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(post);

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
    console.log("objectsobjectsobjects", objects);
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );
    const obj = {
      id: params.id,
      formData: formData,
    };
    console.log("paramsparamsparams", params);
    if (files.length < 1) {
      return window.alert("사진을 입력하세요");
    }
    //Api 날리기
    if (window.confirm("수정하시겠습니까?")) {
      dispatch(__editPost(obj));
      // navigate(`/PostDetail/${params.id}`);
      // window.location.reload(`/PostDetail/${params.id}`);
      // window.location.replace(`/PostDetail/${params.id}`);
    }
  };
  return (
    <>
      <Layout>
        <FirstContainer>
          <div>
            <img
              onClick={() => {
                navigate(-1);
              }}
              style={{ width: 25, height: 25 }}
              src={back}
            />
          </div>
          <div>상품 게시물 수정</div>
          <EditButton onClick={updateSubmit}>완료</EditButton>
        </FirstContainer>
        <ImageWrapper>
          <Stphotolabel htmlFor="imgFile">
            <PhotoButton
              type="button"
              onClick={() => {
                imgRef.current.click();
              }}
            >
              <CameraImg>
                <div>
                  <img src="https://img.icons8.com/fluency-systems-regular/20/null/multiple-cameras.png" />
                </div>
                <div>{fileUrls.length}/5</div>
              </CameraImg>
            </PhotoButton>
            {fileUrls.length > 0 && (
              <>
                <div className="preview" style={{ marginTop: "15px" }}>
                  {
                    /*previews*/
                    fileUrls.map((val, i) => {
                      return (
                        <img
                          src={val}
                          key={i}
                          style={{
                            width: "50px",
                            height: "50px",
                            marginLeft: "5px",
                          }}
                        />
                      );
                    })
                  }
                </div>
              </>
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
          </Stphotolabel>
        </ImageWrapper>
        <div>
          <Title>
            <div>{updateInput.title}</div>
          </Title>

          <Detail
            onClick={() => {
              navigate("/pricingtext", { state: post });
            }}
          >
            <p5>상품 상세 정보</p5>
            <Stdetailrightarrow
              src={whitearrow}
              style={{ width: "25px", height: "25px" }}
            ></Stdetailrightarrow>
          </Detail>

          <PriceInput>
            <TextPrice>판매가격</TextPrice>
            <ExpectPrice>
              <input
                onChange={updateInputHandle}
                name="userPrice"
                value={updateInput.userPrice || ""}
                type="text"
                placeholder="판매 가격을 입력해주세요."
              />
            </ExpectPrice>
          </PriceInput>

          <CalPrice>
            <TextPrice>책정 가격</TextPrice>
            <ExpectPrice>{updateInput.expectPrice}원</ExpectPrice>
          </CalPrice>

          <EditText>
            <div>상품설명</div>
            <div>
              <textarea
                onChange={updateInputHandle}
                name="content"
                value={updateInput.content || ""}
                type="text"
                placeholder="수정할 내용을 입력하세요."
              />
            </div>
          </EditText>
        </div>
        <Footer />
      </Layout>
    </>
  );
};
export default PostUpdate;
// 제목
const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;
const EditButton = styled.div`
  background-color: transparent;
  cursor: pointer;
`;
// 사진 업로드
const ImageWrapper = styled.div`
  height: 80px;
`;
const PhotoButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 25%;
  background-color: aliceblue;
  margin: 10px;
  border: 2px solid #3d6af2;
`;
const CameraImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: none;
`;
// 판매가격 및 내용입력
const PriceInput = styled.div`
  align-items: center;
  height: 60px;
  border-bottom: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  input {
    background-color: transparent;
    border: 1px solid transparent;
    width: 250px;
  }
`;
const EditText = styled.div`
  align-items: center;
  border: none;
  height: 120px;
  margin-top: 15px;
  textarea {
    margin-top: 15px;
    background-color: transparent;
    border: 1px solid transparent;
    width: 300px;
    height: 200px;
  }
`;

const CalPrice = styled.div`
  height: 50px;
  border-bottom: 1px solid lightgray;
`;
// 사진 업로드

const Stphotolabel = styled.label`
  width: 98.5%;
  height: 150px;
  display: inline-block;
  display: flex;
  flex-direction: row;
`;

// 상품 상세정보
const Detail = styled.div`
  background-color: #3d6af2;
  color: white;
  cursor: pointer;
  width: 343px;
  height: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 10px;
`;

const Stdetailrightarrow = styled.img`
  position: relative;
  top: 0px;
  width: 25px;
  height: 25px;
`;

// 제목
const Title = styled.div`
  div {
    height: 60px;
    border-top: 1px solid lightgrey;
  }
  height: 40px;
  border: none;
`;

// 책정가격 폰트
const ExpectPrice = styled.div`
  color: #3d6af2;
  font-weight: bold;
  font-size: 16px;
  input {
    font-size: 16px;
  }
`;

const TextPrice = styled.div`
  margin-top: 15px;
  font-size: 12px;
  color: #000000;
`;
