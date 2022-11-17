import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
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
      category: write.category,
      expectPrice: 1000,
      userPrice: write.userPrice,
      content: write.content,
    };
    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );

    //Api 날리기
    dispatch(props.__addData(formData));
    //navigate("/PostRead");
    console.log("폼데이터", formData);
    console.log("files", files);
    console.log("objects", objects);
  };

  return (
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
        <Stselcet name="category" onChange={writeHandle}>
          {/* <select name="category" onChange={tagHandler} onChange={subTagHandler}> */}
          <option value={"category"}>Category</option>
          <option value={"macbook"}>macbook</option>
          <option value={"iphone"}>iphone</option>
        </Stselcet>
      </div>

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
        <div>
          <Stcontentinput
            onChange={writeHandle}
            name="content"
            value={write.content || ""}
            type="text"
            placeholder="내용을 입력하세요."
          />
        </div>

        <Stpricetinput
          onChange={writeHandle}
          name="userPrice"
          value={write.userPrice || ""}
          type="text"
          placeholder="판매가격을 입력하세요."
        />
        {/* <St22jaegiinput
          onChange={writeHandle}
          name="userPrice"
          value={write.userPrice || ""}
          type="text"
          placeholder="이의제기 내용을 작성해주세요."
        /> */}
      </div>
    </Stcontainer>
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
