import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hook/useInput";
import { useSelector } from "react-redux";
import { __editObjection } from "../../redux/modules/ObjectionsSlice";
import Layout2 from "../../components/commons/Layout2";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/backArrow.svg";

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
            이의제기 수정
          </div>
        </div>
      </Layout2>
    </>
  );
};

export default ObjectionUpdate;
