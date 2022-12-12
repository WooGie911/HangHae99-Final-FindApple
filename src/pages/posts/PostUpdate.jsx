import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { __editPost } from "../../redux/modules/PostsSlice";
import useInput from "../../hook/useInput";
import useImageUpload from "../../hook/useImageUpload";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout2 from "../../components/commons/Layout2";
import backArrow from "../../assets/backArrow.svg";
import blueCamera from "../../assets/blueCamera.png";
import bottomArrow from "../../assets/bottomArrow.svg";
import Xbutton from "../../assets/Xbutton.png";
import whiteXbutton from "../../assets/whiteXbutton.png";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [files, fileUrls, uploadHandle, deleteHandler] = useImageUpload(
    3,
    true,
    4,
    1000,
    false
  );
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

    formData.append(
      "postReqDto",
      new Blob([JSON.stringify(objects)], { type: "application/json" })
    );
    const obj = {
      id: params.id,
      formData: formData,
    };

    //Api 날리기
    if (window.confirm("수정하시겠습니까?")) {
      dispatch(__editPost(obj));
    }
  };
  return (
    <>
      <Layout2>
        <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-2 border-D9">
          <img
            className="h-6 w-6 absolute left-3"
            onClick={() => {
              navigate(-1);
            }}
            src={backArrow}
          />
          <div>
            <div>게시물 수정 </div>
          </div>
        </div>
        <div className="h-[100px] p-[18px] flex border-b-[1px] border-D9 ">
          <label htmlFor="imgFile">
            <button
              className="border-[1px] rounded-md w-16 h-16 flex items-center justify-center content-center text-xs text-CC cursor-pointer"
              onClick={() => {
                imgRef.current.click();
              }}
            >
              <div className="flex-col ">
                <div className="flex justify-center">
                  <img src={blueCamera} />
                </div>
                <div>{fileUrls.length}/3</div>
              </div>
            </button>
          </label>
          {fileUrls.length > 0 ? (
            <div className="flex justify-between">
              {
                /*previews*/
                fileUrls.map((val, i) => {
                  return (
                    <div className=" px-1 flex relative" key={i}>
                      <img
                        className="h-16 w-16 object-cover rounded-md"
                        src={val.url}
                      />
                      <div>
                        <img
                          className="bg-CC rounded-full absolute top-[-9px] right-[-9px] mr-1 w-5"
                          src={Xbutton}
                          onClick={() => deleteHandler(val)}
                        />
                      </div>
                    </div>
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
                maxLength="7"
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
            <textarea
              className="w-full py-3  break-words"
              onChange={updateInputHandle}
              name="content"
              value={updateInput.content || ""}
              type="text"
              placeholder="수정할 내용을 입력하세요.(200자 내)"
              maxLength="200"
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
      </Layout2>
    </>
  );
};
export default PostUpdate;
