import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hook/useInput";
import { useSelector } from "react-redux";
import { __editObjection } from "../../redux/modules/ObjectionsSlice";
import Layout from "../../components/commons/Layout";
import Footer from "../../components/commons/Footer";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import whitearrow from "../../assets/whitearrow.png";
import back from "../../assets/back.png";

const ObjectionUpdate = () => {
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
        <hr />
        <ImageWrapper>
          {post.images &&
            post.images.map((item) => {
              return <img src={item.imgUrl} />;
            })}
        </ImageWrapper>
        <div>
          <hr />
          <TextDiv>{updateInput.title}</TextDiv>
          <hr />
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
          <hr />
          <div>
            {updateInput.expectPrice !== undefined && (
              <>
                <TextDiv>책정 가격</TextDiv>
                <PriceDiv>
                  {updateInput.expectPrice.toLocaleString("ko-KR")}
                </PriceDiv>
              </>
            )}
          </div>
          <hr />
          <PriceInput>
            <div>판매 가격</div>
            <input
              onChange={updateInputHandle}
              name="userPrice"
              value={updateInput.userPrice || ""}
              type="text"
              placeholder="희망 가격을 입력해주세요."
            />
          </PriceInput>

          <hr />
          <EditText>
            content :
            <textarea
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
  border: none;
  height: 60px;
  img {
    width: 50px;
    height: 50px;
  }
`;

// 판매가격 및 내용입력
const PriceInput = styled.div`
  border: none;
  height: 60px;
  input {
    background-color: transparent;
    border: none;
    width: 250px;
  }
  div {
    font-size: 10px;
  }
`;
const EditText = styled.div`
  border: none;
  height: 120px;
  textarea {
    background-color: transparent;
    border: none;
    width: 375px;
    height: 115px;
  }
`;

// 상품 상세 정보
const Detail = styled.div`
  background-color: #3d6af2;
  cursor: pointer;
  color: white;
  width: 343px;
  height: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  bottom: 90px;
  justify-content: space-between;
  padding: 10px;
`;
const Stdetailrightarrow = styled.img`
  position: relative;
  top: 0px;
  width: 25px;
  height: 25px;
`;

const TextDiv = styled.div`
  height: 60px;
  font-size: 10px;
`;

const PriceDiv = styled.div`
  color: #3d6af2;
  font-weight: bold;
  font-size: 16px;
`;
