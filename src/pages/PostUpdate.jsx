import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { __editPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImageUpload from "../hook/useImageUpload";
import { useSelector } from "react-redux";
import PricingText from "../components/PricingText";
import { useParams } from "react-router-dom";

const PostUpdate = () => {
  const paramId = useParams();
  const dispatch = useDispatch();
  const [files, fileUrls, uploadHandle] = useImageUpload(5, true, 0.3, 1000);
  const imgRef = useRef();
  const posts = useSelector((state) => state.details.posts);
  const [delImg, setDelImg] = useState([]);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(posts);

  const updateSubmit = () => {
    //request로 날릴 폼데이터
    const formData = new FormData();
    //폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append("images", null);
    }
    //폼 데이터에 글작성 데이터 넣기
    formData.append("post", JSON.stringify(updateInput.title));

    formData.append("imageId", delImg);

    const obj = {
      id: paramId.id,
      contentInfo: formData,
    };
    //Api 날리기
    dispatch(__editPost(obj));
  };

  const delPreview = (imgId) => {
    //삭제할 이미지 번호 담기
    setDelImg((e) => [...e, imgId]);
  };

  return (
    <div>
      <Header />
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
        <div>
          {
            //기존 이미지 뿌려줄
            posts !== undefined &&
              posts.map((item) => {
                return (
                  <div
                    key={item.paramId}
                    isView={
                      delImg.indexOf(item.paramId) > -1 ? "none" : "block"
                    }
                  >
                    <img src={item.image} />
                    <button
                      style={{
                        width: "100px",
                        marginLeft: "20px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        delPreview(item.paramId);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                );
              })
          }
        </div>
        <div className="preview">
          {
            /*previews map쓸곳*/
            fileUrls.map((val, i) => {
              return <img src={val} key={i} />;
            })
          }
        </div>
        <button onClick={updateSubmit}>글 수정</button>
      </div>
    </div>
  );
};

export default PostUpdate;
