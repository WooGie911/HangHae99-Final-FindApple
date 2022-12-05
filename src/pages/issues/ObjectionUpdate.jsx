import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hook/useInput";
import { useSelector } from "react-redux";
import { __editObjection } from "../../redux/modules/ObjectionsSlice";
import Layout2 from "../../components/commons/Layout2";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backArrow from "../../assets/backArrow.svg";
import blueCamera from "../../assets/blueCamera.png";
import bottomArrow from "../../assets/bottomArrow.svg";

const ObjectionUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { post } = useSelector((state) => state.objectionDetails);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(post);

  const updateSubmit = () => {
    const oobj = {
      content: updateInput.content,
    };
    const formData = new FormData();
    formData.append(
      "issuesRequestDto",
      new Blob([JSON.stringify(oobj)], { type: "application/json" })
    );
    const obj = {
      id: params.id,
      formData: formData,
    };
    dispatch(__editObjection(obj));
    navigate(`/objectionDetail/${params.id}`);
    window.location.reload(`/objectionDetail/${params.id}`);
  };
  return (
    <>
      <Layout2>
        <div className=" flex relative items-center justify-center h-[60px] text-[18px] font-semibold border-b-2 border-D9">
          <img
            className="h-6 w-6 absolute left-3"
            onClick={() => {
              navigate(`/objectionDetail/${post.issuesId}`);
            }}
            src={backArrow}
          />
          <div>
            <div>이의제기 수정 </div>
          </div>
        </div>

        <div className="h-[100px] p-[18px] flex border-b-[1px] border-D9">
          <div className="flex justify-between">
            {post.images &&
              post.images.map((item, index) => {
                return (
                  <img
                    className="h-16 w-16 object-cover mr-3 rounded-md"
                    src={item.imgUrl}
                    key={index}
                  />
                );
              })}
          </div>
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
              <div className="text-xs text-DD">희망가격</div>
              <div className=" bg-transparent text-C4 font-semibold">
                {updateInput.userPrice}
              </div>
            </div>
          </div>
        </div>

        <div className="  py-4 px-[18px] border-b-[1px] border-D9">
          <div className=" h-60 flex-col ">
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
            이의제기 수정
          </div>
        </div>
      </Layout2>
    </>
  );
};

export default ObjectionUpdate;

// 제목
const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const EditButton = styled.div`
  background-color: transparent;
  cursor: pointer;
`;
// 사진 업로드
const ImageWrapper = styled.div`
  border: none;
  height: 60px;
  img {
    width: 50px;
    height: 50px;
  }
`;

// 판매가격 및 내용입력
const PriceInput = styled.div`
  border: none;
  height: 60px;
  input {
    background-color: transparent;
    border: none;
    width: 250px;
  }
  div {
    font-size: 10px;
  }
`;
const EditText = styled.div`
  border: none;
  height: 120px;
  textarea {
    background-color: transparent;
    border: none;
    width: 375px;
    height: 115px;
  }
`;

// 상품 상세 정보
const Detail = styled.div`
  background-color: #3d6af2;
  cursor: pointer;
  color: white;
  width: 343px;
  height: 20px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  margin: auto;
  margin-bottom: 20px;
  bottom: 90px;
  justify-content: space-between;
  padding: 10px;
`;
const Stdetailrightarrow = styled.img`
  position: relative;
  top: 0px;
  width: 25px;
  height: 25px;
`;

const TextDiv = styled.div`
  height: 60px;
  font-size: 10px;
`;

const PriceDiv = styled.div`
  color: #3d6af2;
  font-weight: bold;
  font-size: 16px;
`;
