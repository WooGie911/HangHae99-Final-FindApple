import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../hook/useInput";
import { useSelector } from "react-redux";
import PricingText from "../components/PricingText";
import { __editObjection } from "../redux/modules/ObjectionsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const ObjectionUpdate = ({ paramId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { posts } = useSelector((state) => state.objectionDetails);
  const [updateInput, setUpdateInput, updateInputHandle] = useInput(posts);

  const updateSubmit = () => {
    console.log("updateInput", updateInput);
    const obj = {
      id: paramId,
      formData: updateInput,
    };
    dispatch(__editObjection(obj));
    navigate(`/objectionDetail/${params.id}`);
    // window.location.replace(`/objectionDetail/${params.id}`);
  };
  return (
    <>
      <Layout>
        <div>ObjectionUpdate</div>
        <PricingText Data={posts} />
        //*기존 이미지들*/
        <div>
          {posts.images &&
            posts.images.map((item) => {
              return <img src={item.imgUrl} />;
            })}
        </div>
        <div>
          title :<div>{updateInput.title}</div>
          <button
            onClick={() => {
              navigate("/pricingText", { state: posts });
            }}
          >
            상품 상세 정보
          </button>
          <br />
          <br />
          측정 가격 :<div>{updateInput.getPrice}</div>
          <br />
          <br />
          판매가격 :
          <input
            onChange={updateInputHandle}
            name="userPrice"
            value={updateInput.userPrice || ""}
            type="text"
            placeholder="가격을 입력하세요."
          />
          <br />
          <br />
          content
          <input
            onChange={updateInputHandle}
            name="content"
            value={updateInput.content || ""}
            type="text"
            placeholder="내용을 입력하세요."
          />
          <button onClick={updateSubmit}>글 수정</button>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionUpdate;
