import React, { useRef, useState } from "react";
import styled from "styled-components";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import whitearrow from "../assets/whitearrow.png";

const PostsCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { DetailPrice } = useSelector((state) => state.price);

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
    };

    formData.append(
      props.postReqDto,
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );
    {
      DetailPrice.category === "macbook"
        ? formData.append(
            "macbookOption",
            new Blob([JSON.stringify(DetailPrice)], {
              type: "application/json",
            })
          )
        : formData.append(
            "iphoneOption",
            new Blob([JSON.stringify(DetailPrice)], {
              type: "application/json",
            })
          );
    }
    if (files.length < 1) {
      return window.alert("사진을 입력하세요");
    }
    //Api 날리기

    if (window.confirm("작성하시겠습니까?")) {
      dispatch(props.__addData(formData));
      window.location.replace(`${props.Navigate}`);
    }
  };
  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Stcontainer>
        <Stuploadbutton>
          <div>
            <div>
              <img
                onClick={onClickHandler}
                style={{ width: 25, height: 25 }}
                src="https://img.icons8.com/ios-glyphs/30/null/chevron-left.png"
              />
            </div>
          </div>
          <div>
            <h3>상품등록</h3>
          </div>
          <div>
            <span onClick={writeSubmit}>완료</span>
          </div>
        </Stuploadbutton>
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
        </Stphotolabel>

        <div>
          <Sttitleinput
            onChange={writeHandle}
            name="title"
            value={write.title || ""}
            type="text"
            placeholder="글제목"
          />
        </div>

        <Detail
          onClick={() => {
            navigate("/pricingfinal");
          }}
        >
          <p5>상품 상세 정보</p5>
          <Stdetailrightarrow
            src={whitearrow}
            style={{ width: "25px", height: "25px" }}
          ></Stdetailrightarrow>
        </Detail>

        <Price>
          <p5>
            {DetailPrice.getPrice !== undefined && (<>
            책정 가격 <div>{DetailPrice.getPrice.toLocaleString('ko-KR')}원</div>
            </>)}
          </p5>
        </Price>

        <Stpriceinput
          onChange={writeHandle}
          name="userPrice"
          value={write.userPrice || ""}
          type="text"
          placeholder="판매 가격"
        />

        <div>
          <Stcontentinput
            onChange={writeHandle}
            name="content"
            value={write.content || ""}
            type="text"
            placeholder="상품설명을 작성해주세요."
          />
        </div>
      </Stcontainer>
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
// 가격 결정
const Price = styled.div`
  color: gray;
  font-size: 15px;
  width: 98.5%;
  height: 60px;
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  font-size: 15px;
  margin-bottom: 10px;
  div {
    color: #3d6af2;
  }
`;

const Stpriceinput = styled.input`
  border: none;
  width: 97.5%;
  height: 40px;
  border-bottom: 2px solid lightgrey;
  background-color: transparent;
  margin-bottom: 10px;
  font-size: 15px;
`;

const Stuploadbutton = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;

  img {
    cursor: pointer;
    margin-top: 15px;
  }
  span {
    cursor: pointer;
    position: relative;
    top: 17px;

    font-weight: 550;
  }
`;

// 내용 입력
const Stcontentinput = styled.textarea`
  width: 97.5%;
  height: 120px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid lightgrey;
  margin-bottom: 10px;
  font-size: 15px;
`;

// 사진 업로드
const PhotoButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: white;
  margin: 10px;
  border: 2px solid #3d6af2;
  top: 25px;
`;
const CameraImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 5px;
  cursor: pointer;
  div {
    border: #3d6af2;
    color: #3d6af2;
  }
`;

// 사진 업로드 관련인 듯
const Stphotolabel = styled.label`
  width: 98.5%;
  height: 100px;
  display: inline-block;
  border-bottom: 2px solid lightgrey;
  display: flex;
  flex-direction: row;
`;

const Sttitleinput = styled.input`
  width: 97.5%;
  height: 40px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid lightgrey;
  margin-bottom: 10px;
  font-size: 15px;
`;
const Stdetailrightarrow = styled.img`
  position: relative;
  top: 0px;
  width: 25px;
  height: 25px;
`;
