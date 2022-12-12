import React, { useRef, useState } from "react";
import useInput from "../../hook/useInput";
import useImageUpload from "../../hook/useImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import backArrow from "../../assets/backArrow.svg";
import blueCamera from "../../assets/blueCamera.png";
import Pricingfinal2 from "../price/Pricingfinal2";
import Xbutton from "../../assets/Xbutton.png";
import whiteXbutton from "../../assets/whiteXbutton.png";

const PostsCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { DetailPrice } = useSelector((state) => state.price);
  const [detailToggle, setDetailToggle] = useState(false);
  const [write, setWrite, writeHandle] = useInput({
    title: "",
    userPrice: "",
    content: "",
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle, deleteHandler] = useImageUpload(
    3,
    true,
    4,
    1000,
    false
  );
  const imgRef = useRef();

  //상세보기 토글
  const editToggleHandler = () => {
    setDetailToggle(!detailToggle);
  };

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

    if (write.title === "") {
      return window.alert("제목을 입력하세요");
    }

    // 돈 단위 alert
    if (write.userPrice > 9999999) {
      return window.alert("가격이 너무 높습니다.");
    }

    if (props.post === "post") {
      if (write.userPrice === "") {
        return window.alert("판매가격을 입력하세요");
      }
    } else {
      if (write.userPrice === "") {
        return window.alert("희망가격을 입력하세요");
      }
    }

    if (write.content === "") {
      return window.alert("상품설명을 입력하세요");
    }

    if (window.confirm("작성하시겠습니까?")) {
      dispatch(props.__addData(formData));
      // navigate(`/${props.Navigate}`);
      // window.location.reload(`/${props.Navigate}`);
    }
  };
  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-2 border-D9">
        <img
          className="h-6 w-6 absolute left-3"
          onClick={() => {
            onClickHandler();
          }}
          src={backArrow}
        />
        <div>
          {props.post === "post" ? <div>상품등록</div> : <div>이의제기</div>}
        </div>
      </div>

      <div className="h-[100px] p-[18px] flex border-b-[1px] border-D9   ">
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
          <input
            className="w-full py-3  break-words"
            onChange={writeHandle}
            name="title"
            value={write.title || ""}
            type="text"
            placeholder="글 제목을 입력하세요(20자 내)"
            maxLength="20"
          />
        </div>
      </div>
      <div className="  py-2 px-[18px] border-b-[1px] border-D9">
        <div className="h-16 flex items-center justify-between">
          {DetailPrice.getPrice !== undefined && (
            <div className="flex-col">
              <div className="text-xs text-DD">책정가격</div>
              <div className="text-CC font-semibold">
                {DetailPrice.getPrice.toLocaleString("ko-KR")}원
              </div>
            </div>
          )}

          <div
            className="bg-C4 w-24 h-9 rounded-md text-xs text-white  flex justify-center items-center"
            onClick={editToggleHandler}
          >
            <div> 상품 상세 정보</div>
          </div>
        </div>
      </div>
      {props.post === "post" ? (
        <div className=" py-2 px-[18px] border-b-[1px] border-D9">
          <div className="  h-16 flex items-center">
            <div className="flex-col">
              <div className="text-xs text-DD">판매가격</div>
              <input
                className=" bg-transparent text-C4 font-semibold"
                onChange={writeHandle}
                name="userPrice"
                value={write.userPrice || ""}
                type="number"
                placeholder="희망 가격을 입력해주세요."
                max="9999999"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className=" py-2 px-[18px] border-b-[1px] border-D9">
          <div className="  h-16 flex items-center">
            <div className="flex-col">
              <div className="text-xs text-DD">희망가격</div>
              <input
                className=" bg-transparent text-C4 font-semibold"
                onChange={writeHandle}
                name="userPrice"
                value={write.userPrice || ""}
                type="number"
                placeholder="희망 가격을 입력해주세요."
                max="9999999"
              />
            </div>
          </div>
        </div>
      )}

      <div className="  py-4 px-[18px] border-b-[1px] border-D9">
        <textarea
          className="w-full py-3  break-words"
          onChange={writeHandle}
          name="content"
          value={write.content || ""}
          type="text"
          placeholder="상품설명을 작성해주세요.(200자 내)"
          maxLength="200"
        />
      </div>

      <div className=" py-3 px-[18px] h-20 w-[375px] fixed bottom-0 text-white ">
        {props.post === "post" ? (
          <div
            className="bg-CC w-full h-full rounded-md flex items-center justify-center"
            onClick={() => {
              writeSubmit();
            }}
          >
            상품 등록
          </div>
        ) : (
          <div
            className="bg-CC w-full h-full rounded-md flex items-center justify-center"
            onClick={() => {
              writeSubmit();
            }}
          >
            이의 제기
          </div>
        )}
      </div>

      {detailToggle && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 z-20 w-full h-full "
          onClick={editToggleHandler}
        >
          <Pricingfinal2 setDetailToggle={setDetailToggle} />
        </div>
      )}
    </>
  );
};

export default PostsCreate;
