import React, { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      option: { ...DetailPrice },
    };
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );

    //Api 날리기
    dispatch(props.__addData(formData));
    // navigate(`${props.Navigate}`);

    // window.location.replace(`${props.Navigate}`);
  };

  return (
    <>
      <Stcontainer>
        <Stuploadbutton>
          <div>
            <h3>상품등록</h3>
          </div>
          <div>
            <button onClick={writeSubmit}>완료</button>
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
            <Stbutton
              type="button"
              onClick={() => {
                imgRef.current.click();
              }}
            ></Stbutton>
          )}
        </Stphotolabel>

        <div>
          <div>
            <Sttitleinput
              onChange={writeHandle}
              name="title"
              value={write.title || ""}
              type="text"
              placeholder="제목을 입력하세요."
            />
          </div>
          <br />
          <br />
          <button
            onClick={() => {
              navigate("/pricingfinal");
            }}
          >
            상품 상세 정보
          </button>
          <br />
          <br />
          측정 가격 :<div>{DetailPrice.getPrice}</div>
          <br />
          <br />
          판매가격:
          <input
            onChange={writeHandle}
            name="userPrice"
            value={write.userPrice || ""}
            type="text"
            placeholder="가격을 입력하세요."
          />
          <br />
          <br />
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
    </>
  );
};

export default PostsCreate;

const Stcontainer = styled.div`
  display: flex;
  width: 516px;
  height: 634px;
  border: 1px solid black;
  flex-direction: column;
`;
const Stselcet = styled.select`
  text-align: center;
  width: 100%;
  height: 40px;
`;
const Stphotolabel = styled.label`
  height: 150px;
  border-bottom: 1px solid black;
  display: inline-block;
`;
const Stbutton = styled.button`
  width: 66px;
  height: 66px;
  background-image: url("https://img.icons8.com/external-outline-design-circle/66/null/external-Upload-seo-and-web-outline-design-circle.png");
  background-color: white;
  outline: 0;
  border: 0;
`;
const Sttitleinput = styled.input`
  width: 98.5%;
  height: 30px;
`;
const Stcontentinput = styled.input`
  width: 98.5%;
  height: 30px;
`;
const Stpricetinput = styled.input`
  width: 98.5%;
  height: 30px;
`;
const St22jaegiinput = styled.input`
  width: 98.5%;
  height: 90px;
`;
const Stuploadbutton = styled.div`
  border: 1px solid black;
  display: inline-block;
  justify-content: space-between;
`;
