import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { __editPost } from "../../redux/modules/PostsSlice";
import useInput from "../../hook/useInput";
import useImageUpload from "../../hook/useImageUpload";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/commons/Layout";
import backArrow from "../../assets/backArrow.svg";
import blueCamera from "../../assets/blueCamera.png";
import bottomArrow from "../../assets/bottomArrow.svg";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [files, fileUrls, uploadHandle] = useImageUpload(5, true, 1, 1000);
  const imgRef = useRef();
  const { post } = useSelector((state) => state.details);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(post);
  console.log("이미지 왜안나와", post.images);
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
      navigate(`/PostDetail/${params.id}`);
      window.location.reload(`/PostDetail/${params.id}`);
    }
  };
  return (
    <>
      <Layout>
        <div className="bg-white h-screen">
          <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-2 border-D9">
            <img
              className="h-6 w-6 absolute left-3"
              onClick={() => {
                navigate(`/PostDetail/${post.postId}`);
              }}
              src={backArrow}
            />
            <div>
              <div>게시물 수정 </div>
            </div>
          </div>

          <div className="h-[100px] p-[18px] flex border-b-[1px] border-D9">
            <label htmlFor="imgFile">
              <div
                className="border-[1px] rounded-md w-16 h-16 flex items-center justify-center content-center text-xs text-CC cursor-pointer"
                onClick={() => {
                  imgRef.current.click();
                }}
              >
                <div className="flex-col ">
                  <div className="flex justify-center">
                    <img src={blueCamera} />
                  </div>
                  <div>{fileUrls.length}/5</div>
                </div>
              </div>
            </label>
            {fileUrls.length > 0 ? (
              <div className="flex justify-between">
                {
                  /*previews*/
                  fileUrls.map((val, i) => {
                    return (
                      <img
                        className="h-16 w-16 object-cover ml-3 rounded-md"
                        src={val}
                        key={i}
                      />
                    );
                  })
                }
              </div>
            ) : (
              <div className="flex justify-between">
                {post.images &&
                  post.images.map((item, index) => {
                    return (
                      <img
                        className="h-16 w-16 object-cover ml-3 rounded-md"
                        src={item.imgUrl}
                        key={index}
                      />
                    );
                  })}
              </div>
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
          </div>

          <div className=" py-2 px-[18px] border-b-[1px] border-D9 font-semibold">
            <div className=" h-16 flex items-center">
              <div className="">{updateInput.title}</div>
            </div>
          </div>
          <div className="  py-2 px-[18px] border-b-[1px] border-D9">
            <div className="h-16 flex items-center justify-between">
              {updateInput.expectPrice !== undefined && (
                <div className="flex-col">
                  <div className="text-xs text-DD">책정가격</div>
                  <div className="text-CC font-semibold">
                    {updateInput.expectPrice.toLocaleString("ko-KR")}원
                  </div>
                </div>
              )}
              <div
                className="bg-C4 w-24 h-9 rounded-md text-xs text-white  flex justify-center items-center"
                onClick={() => {
                  navigate("/pricingtext", { state: post });
                }}
              >
                <div> 상품 상세 정보</div>
              </div>
            </div>
          </div>
          <div className=" py-2 px-[18px] border-b-[1px] border-D9">
            <div className="  h-16 flex items-center">
              <div className="flex-col">
                <div className="text-xs text-DD">판매가격</div>
                <input
                  className=" bg-transparent text-C4 font-semibold"
                  onChange={updateInputHandle}
                  name="userPrice"
                  value={updateInput.userPrice || ""}
                  type="text"
                  placeholder="판매 가격을 입력해주세요."
                />
              </div>
            </div>
          </div>
          <div className="  py-4 px-[18px] border-b-[1px] border-D9">
            <div className=" h-60 flex-col ">
              <div className=" w-24 h-9 rounded-md text-xs text-DD  flex justify-between p-3 items-center border-[1px] border-DD">
                <div>판매중</div>
                <img src={bottomArrow} />
              </div>
              <input
                className="w-full py-3  break-words"
                onChange={updateInputHandle}
                name="content"
                value={updateInput.content || ""}
                type="text"
                placeholder="수정할 내용을 입력하세요."
              />
            </div>
          </div>

          <div className=" py-3 px-[18px] h-20 w-[375px] fixed bottom-0 text-white ">
            <div
              className="bg-CC w-full h-full rounded-md flex items-center justify-center"
              onClick={() => {
                updateSubmit();
              }}
            >
              게시물 수정
            </div>
          </div>
        </div>
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
  cursor: pointer;
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

const Stphotolabel = styled.div`
  width: 98.5%;
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

// 이미지 크기 지정
const Image = styled.img`
  margin-top: 10px;
  margin-left: 8px;
  width: 50px;
  height: 50px;
`;
