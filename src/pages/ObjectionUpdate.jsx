import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../hook/useInput";
import { useSelector } from "react-redux";
import { __editObjection } from "../redux/modules/ObjectionsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import back from "../assets/back.png";

const ObjectionUpdate = ({ paramId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { post } = useSelector((state) => state.objectionDetails);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(post);

  const updateSubmit = () => {
    const oobj = {
      content: updateInput.content,
    };
    const formData = new FormData();
    formData.append(
      "issuesRequestDto",
      new Blob([JSON.stringify(oobj)], { type: "application/json" })
    );
    const obj = {
      id: params.id,
      formData: formData,
    };
    dispatch(__editObjection(obj));
    navigate(`/objectionDetail/${params.id}`);
    window.location.reload(`/objectionDetail/${params.id}`);
    // window.location.replace(`/objectionDetail/${params.id}`);
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
          {post.images &&
            post.images.map((item) => {
              return <img src={item.imgUrl} />;
            })}
        </ImageWrapper>
        <div>
          <br />
          <br />
          title :<div>{updateInput.title}</div>
          <br />
          <br />
          <button
            onClick={() => {
              navigate("/pricingtext", { state: post });
            }}
          >
            상품 상세 정보
          </button>
          <br />
          <br />
          <PriceInput>
            희망가격:
            <input
              onChange={updateInputHandle}
              name="userPrice"
              value={updateInput.userPrice || ""}
              type="text"
              placeholder="희망 가격을 입력해주세요."
            />
          </PriceInput>
          <br />
          <br />
          측정 가격 :<div>{updateInput.getPrice}</div>
          <br />
          <br />
          <EditText>
            content :
            <input
              onChange={updateInputHandle}
              name="content"
              value={updateInput.content || ""}
              type="text"
              placeholder="수정할 내용을 입력하세요."
            />
          </EditText>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionUpdate;

// 제목
const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const EditButton = styled.div`
  background-color: transparent;
  cursor: pointer;
`;
// 사진 업로드
const ImageWrapper = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  height: 60px;
`;
const PhotoButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 25%;
  background-color: aliceblue;
  margin: 10px;
`;
const CameraImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
`;
// 판매가격 및 내용입력
const PriceInput = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  height: 60px;
  input {
    background-color: transparent;
    border: 1px solid transparent;
    width: 250px;
  }
`;
const EditText = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  height: 120px;
  textarea {
    background-color: transparent;
    border: 1px solid transparent;
    width: 375px;
    height: 115px;
  }
`;
