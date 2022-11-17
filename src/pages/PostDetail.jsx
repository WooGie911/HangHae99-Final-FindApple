import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { __deletePost, __CartPost } from "../redux/modules/PostsSlice";
import {
  __addPostComment,
  __deletePostComment,
} from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.details);

  // const { comments } = useSelector((state) => state.details.posts);

  //찜하기
  const onCartButton = (payload) => {
    dispatch(__CartPost(payload));
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deletePost(payload));
      window.location.replace("/postread/all");
    } else {
      window.location.reload();
    }

    //   navigate("/postread/all");
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
              <Button onClick={() => navigate(`/postupdate/${params.id}`)}>
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
        <button onClick={() => navigate(-1)}>이전으로</button>

        <br />
        <br />
        <div>
          {post.images !== undefined &&
            post.images.map((item, index) => {
              return <img src={item.imgUrl} key={index} />;
            })}
          <br />
          <br />
          <div>글쓴이 프로필사진 , 닉네임 : {post.nickname}</div>
          <button onClick={() => onCartButton(post.postId)}>찜</button>
          <br />
          <div>글제목 : {post.title}</div>
          <br />
          <div>내용 : {post.content}</div>
          <br />

          <div> 하트 {post.likeCnt}</div>
          <br />
          <div>책정 가격 : {post.expectPrice}</div>

          <div>판매 가격 : {post.userPrice}</div>
          <br />
        </div>

        <button onClick={() => navigate(`/postComment/${params.id}`)}>
          댓글
        </button>

        <div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default PostDetail;

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
