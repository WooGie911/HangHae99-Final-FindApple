import React, { useRef, useState, useEffect } from "react";
import useInput from "../hook/useInput";
import useImgUpload from "../hook/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
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
        <br />
        <br />
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
          /*previews*/
          fileUrls.map((val, i) => {
            return <img src={val} key={i} />;
          })
        }
      </div>
      <br />
      <div>
        title:
        <input
          onChange={writeHandle}
          name="title"
          value={write.title || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
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
        content:
        <input
          onChange={writeHandle}
          name="content"
          value={write.content || ""}
          type="text"
          placeholder="내용을 입력하세요."
        />
        <br />
        <br />
        <button onClick={writeSubmit}>글 작성</button>
      </div>
    </div>
  );
};

export default PostsCreate;
