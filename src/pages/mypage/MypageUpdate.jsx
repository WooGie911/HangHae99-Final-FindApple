import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hook/useInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { __UserProfileEdit } from "../../redux/modules/LoginSlice";
import Layout from "../../components/commons/Layout";
import useImageUpload from "../../hook/useImageUpload";
import backArrow from "../../assets/pictures/backArrow.svg";

const MypageUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.Login);
  const [write, setWrite, writeHandle] = useInput({
    nickname: user.nickname,
  });

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle] = useImageUpload(3, true, 4, 1000);
  const imgRef = useRef();

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

  const onSubmitHandler = () => {
    imgRef.current.click();
  };

  const writeSubmit = () => {
    const formData = new FormData();

    //폼 데이터에 파일 담기
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("image", file);
      });
    } else {
      formData.append("image", null);
    }

    const obj = {
      nickname: write.nickname,
    };
    formData.append(
      "myInfoRequestDto",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    );
    dispatch(__UserProfileEdit(formData));
  };

  const onClickHandler = () => {
    navigate("/mypage");
  };

  return (
    <Layout>
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold ">
        <img
          className="cursor-pointer h-6 w-6 absolute left-3 "
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>
          <div>프로필 수정 </div>
        </div>
        <button onClick={writeSubmit} className="  absolute right-4">
          완료
        </button>
      </div>

      <div className=" text-[14px] font-semibold">
        <input
          type="file"
          accept="image/*"
          name="imgFile"
          id="imgFile"
          onChange={uploadHandle}
          ref={imgRef}
          style={{
            display: "none",
          }}
        />
        <label htmlFor="imgFile">
          <div className="flex justify-center items-center mt-5 p-3">
            <button onClick={onSubmitHandler}>
              {fileUrls.length > 0 ? (
                <img
                  className="cursor-pointer w-[88px] h-[88px] rounded-full object-cover"
                  src={fileUrls[0].url}
                />
              ) : (
                <img
                  className="cursor-pointer w-[88px] h-[88px] rounded-full object-cover"
                  src={user.profileImg}
                />
              )}
            </button>
          </div>

          <div className="cursor-pointer text-center font-medium text-CC">
            <button onClick={onSubmitHandler}>프로필 사진 바꾸기</button>
          </div>
        </label>
        <div className="ml-5 mb-2 mt-3">닉네임</div>
        <div className="px-6">
          <input
            className="bg-transparent w-full pl-3 h-[38px] rounded border-C4 border-[1px]"
            onChange={writeHandle}
            name="nickname"
            value={write.nickname || ""}
            placeholder="10자 이내로 작성해주세요"
            maxLength="10"
          />
        </div>
      </div>
    </Layout>
  );
};

export default MypageUpdate;
