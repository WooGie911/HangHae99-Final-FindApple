import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../redux/modules/PostsSlice";
import { __CartInPost, __CartOutPost } from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import back from "../assets/back.png";

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { post } = useSelector((state) => state.details);
  console.log(post)

  //찜하기
  const onCartButton = (payload) => {
    {
      post.isLike
        ? dispatch(__CartOutPost(payload))
        : dispatch(__CartInPost(payload));
    }
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

        <div>
          {post.images !== undefined &&
            post.images.map((item, index) => {
              return <Image src={item.imgUrl} key={index} />;
            })}
        </div>
        {/* 추후 댓글 만들어지면 들어갈 내용 */}
        {/* 찜카운트 추가 예정 */}
        <WriterContainer>
        <div>글쓴이 프로필사진 , 닉네임 : {post.nickname}</div>
        <img
          src="https://img.icons8.com/ios-glyphs/15/null/hearts.png"
          onClick={() => onCartButton(post.postId)}
        />
        </WriterContainer>
        <hr/>
        {/* <div>찜 유무 : {post.isLike ? "찜한거" : "안한거"}</div>
        <div> 하트 {post.likeCnt}</div> */}
        <h3>{post.title}</h3>
        <div>{post.content}</div>
        <Price>
          <div><TextDiv>책정가격</TextDiv>
          <PriceDiv>{post.expectPrice}원</PriceDiv>
          </div>
          <Arrow>
            {" "}
            <img src="https://img.icons8.com/metro/15/null/long-arrow-right.png" />{" "}
          </Arrow>
          <div><TextDiv>판매가격</TextDiv>
          <PriceDiv>{post.userPrice}원</PriceDiv>
          </div>
          <div>
            <img onClick={() => {
            navigate(`/postComment/${params.id}`);
          }} src="https://img.icons8.com/ios/25/null/topic.png" />
          <TextDiv>댓글</TextDiv>
          </div>
        </Price>
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
  border-top: 1px solid #D9D9D9;
  width : 367px;
  height : 86px;
  position : fixed;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  div {
    margin-right: 10px;
    padding-top: 10px;
  }
`;

const Arrow = styled.div`
margin-top: 20px;
`

const TextDiv = styled.div`
font-size: 10px;
`

const PriceDiv = styled.div`
font-size: 16px
`

// 글쓴이 정보 및 하트
const WriterContainer = styled.div`
display: flex;
justify-content: space-between;
`
