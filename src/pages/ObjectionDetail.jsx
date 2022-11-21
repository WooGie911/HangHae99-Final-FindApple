import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deleteObjection } from "../redux/modules/ObjectionsSlice";
import photoIMG from "../assets/photoIMG.png";
import {
  __CartInObjection,
  __CartOutObjection,
  __getObjectionDetail,
} from "../redux/modules/ObjectionDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";

const ObjectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.objectionDetails);
  console.log("이슈 포스트 뭐 들어왔나 변수명(id)", post);
  //찜하기
  const onCartButton = (payload) => {
    {
      post.isLike
        ? dispatch(__CartOutObjection(payload))
        : dispatch(__CartInObjection(payload));
    }
  };

  //이의제기 게시글 삭제
  const onDeleteHandler = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteObjection(payload));
      window.location.replace("/objectionread/all");
    }
  };

  const [editTg, setEidtTg] = useState({
    isEdit: false,
  });

  const editToggleHandler = () => {
    const newEdit = {
      isEdit: !editTg.isEdit,
    };
    setEidtTg(newEdit);
  };

  useEffect(() => {
    dispatch(__getObjectionDetail(params.id));
  }, [params]);

  useEffect(() => {
    dispatch(__getObjectionDetail(params.id));
  }, [post.updateComment]);

  return (
    <>
      <Layout>
        <EditHead>
          <div>
            <img
              onClick={() => {
                navigate(-1);
              }}
              style={{ width: 25, height: 25 }}
              src={back}
            />
          </div>
          <Tgbutton onClick={editToggleHandler}>···</Tgbutton>
          {editTg.isEdit === true ? (
            <ToggleNav>
              <Button onClick={() => navigate(`/objectionupdate/${params.id}`)}>
                수정
              </Button>
              <Button
                onClick={() => {
                  onDeleteHandler(params.id);
                }}
              >
                글삭제
              </Button>
            </ToggleNav>
          ) : null}
        </EditHead>
        <div>
          {post.images !== undefined &&
            post.images.map((item, index) => {
              return <Image src={item.imgUrl} key={index} />;
            })}

          <h3>{post.title}</h3>
          <div>{post.content}</div>
        </div>
        <div>
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              float: "left",
            }}
            src={
              post.avatarUrl == (null || undefined) ? photoIMG : post.avatarUrl
            }
          />
          {post.nickname}
        </div>
        {/* <button onClick={() => onCartButton(post.issuesId)}>찜</button> */}
        <div>
          <div>
            <img
              src="https://img.icons8.com/ios-glyphs/15/null/hearts.png"
              onClick={() => onCartButton(post.issuesId)}
            />{" "}
            {post.likeCnt}
          </div>
          <div>찜 유무 : {post.isLike ? "찜한거" : "안한거"}</div>
          <div> {post.createdAt}</div>
        </div>
        <hr />
        <Price>
          <div>책정가격 : {post.expectPrice} 원</div>
          <div>
            {" "}
            <img src="https://img.icons8.com/metro/15/null/long-arrow-right.png" />{" "}
          </div>
          <div>판매가격 : {post.userPrice} 원</div>
          <div>
            <img src="https://img.icons8.com/ios/25/null/topic.png" />
          </div>
        </Price>

        <button onClick={() => navigate(`/objectionComment/${params.id}`)}>
          댓글
        </button>
        <Footer />
      </Layout>
    </>
  );
};

export default ObjectionDetail;

// 수정 삭제 토글 및 뒤로가기
const EditHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Tgbutton = styled.button`
  border: none;
  font-weight: 600;
  width: 50px;
  background-color: white;
`;
const ToggleNav = styled.div`
  width: 50px;
  height: 80px;
  position: absolute;
  right: 10px;
  top: 50px;
`;
const Button = styled.button`
  width: 50px;
  height: 40px;
  margin-bottom: 3px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: red;
  }
`;

// 이미지 크기 지정
const Image = styled.img`
  width: 300px;
  height: 300px;
  margin: auto;
  margin-bottom: 20px;
  display: block;
`;

// 물건 가격
const Price = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
`;
