import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { __editPost } from "../redux/modules/PostsSlice";
import useInput from "../hook/useInput";
import useImageUpload from "../hook/useImageUpload";
import { useSelector } from "react-redux";
import PricingInput from "../components/PricingInput";

const PostUpdate = ({ paramId }) => {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const posts = useSelector((state) => state.posts.posts);
  const [files, fileUrls, uploadHandle] = useImageUpload(5, true, 0.3, 1000);
  const [delImg, setDelImg] = useState([]);
  const [upInput, setUpInput, upInputHandle] = useInput({ posts });

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
    formData.append("post", JSON.stringify(upInput.title));

    formData.append("imageId", delImg);

    const obj = {
      id: paramId,
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
      <PricingInput />

      <div>
        title:
        <input
          onChange={upInputHandle}
          name="title"
          value={upInput.title || ""}
          type="text"
          placeholder="제목을 입력하세요."
        />
        content
        <input
          onChange={upInputHandle}
          name="content"
          value={upInput.content || ""}
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
