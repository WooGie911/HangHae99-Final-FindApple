import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hook/useInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { __UserProfileEdit } from "../../redux/modules/LoginSlice";
import Layout from "../../components/commons/Layout";
import backArrow from "../../assets/backArrow.svg";

const MypageUpdate = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [photo, setPhoto] = useState(null);
  // 사진을 저장하는 로직이 없었다.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    navigate("/mypage");
  };

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  };

  const { user } = useSelector((state) => state.Login);
  const [write, setWrite, writeHandle] = useInput({
    nickname: user.nickname,
  });

  //get 해오기
  useEffect(() => {
    dispatch(__UserProfileEdit);
  }, [dispatch]);

  const onSubmitHandler = () => {
    imageUploader.current.click();
  };

  const nicknameEdit = () => {
    const formData = new FormData();
    formData.append("image", photo);
    const obj = {
      nickname: write.nickname,
    };
    formData.append(
      "myInfoRequestDto",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    );
    dispatch(__UserProfileEdit(formData));
    window.location.replace("/mypage");
  };

  return (
    <Layout>
      <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold ">
        <img
          className="h-6 w-6 absolute left-3"
          onClick={onClickHandler}
          src={backArrow}
        />
        <div>
          <div>프로필 수정 </div>
        </div>
        <button onClick={nicknameEdit} className="  absolute right-4">
          완료
        </button>
      </div>

      <div className=" text-[14px] font-semibold">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none",
          }}
        />
        <div className="flex justify-center items-center mt-5 p-3">
          <img
            className=" w-[88px] h-[88px] rounded-full "
            src={user.profileImg}
            ref={uploadedImage}
            onClick={onSubmitHandler}
          />
        </div>

        <div className="text-center font-medium text-CC">
          프로필 사진 바꾸기
        </div>

        <div className="ml-5 mb-2 mt-3">닉네임</div>
        <div className="px-6">
          <input
            className="bg-transparent w-full pl-3 h-[38px] rounded border-C4 border-[1px]"
            onChange={writeHandle}
            name="nickname"
            value={write.nickname || ""}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MypageUpdate;
