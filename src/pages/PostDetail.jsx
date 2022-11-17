import React , {useState}from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import { __deletePost, __CartPost } from "../redux/modules/PostsSlice";
import {
  __addPostComment,
  __deletePostComment,
} from "../redux/modules/PostDetailsSlice";
import Layout from "../components/Layout"
import Footer from "../components/Footer"
import back from "../assets/back.png" 

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { posts } = useSelector((state) => state.details);
  console.log("posts 유즈셀렉터 데이터", posts);
  // const { comments } = useSelector((state) => state.details.posts);

  //찜하기
  const onCartButton = (payload) => {
    dispatch(__CartPost(payload));
  };

  //게시글 삭제
  const onDeleteHandler = (payload) => {
    if(window.confirm("정말 삭제하시겠습니까?")){
      dispatch(__deletePost(payload));
    window.location.replace("/postread/all");
    }else{
      window.location.reload()
    }
    
    //   navigate("/postread/all");
  };

  const [editTg, setEidtTg] = useState({
    isEdit:false,
  });
  
  const editToggleHandler = (postId) => {
    const newEdit = {
      isEdit:!editTg.isEdit,
    }
    setEidtTg(newEdit)
  }


  return (
    <>
    <Layout>
      <EditHead>
      <div><img onClick={()=> {navigate(-1)}} style={{width:25, height : 25}} src={back}/></div>
      <Tgbutton onClick={editToggleHandler}>···</Tgbutton>
                {editTg.isEdit === true ? (
                <ToggleNav>
                  <Button onClick={() => navigate(`/postupdate/${params.id}`)}>수정</Button>
                  <Button onClick={() => {onDeleteHandler(params.id);}}>글삭제</Button>
                </ToggleNav>
                ):null 
                } 
    </EditHead>
      <button onClick={() => onCartButton(posts.postId)}>찜</button>
      
      <div>
        <div>{posts.title}</div>
        {posts.images !== undefined &&
          posts.images.map((item, index) => {
            return <img src={item.imgUrl} key={index} />;
          })}
        <div>{posts.expectPrice}</div>
        <div>{posts.userPrice}</div>
        <div>{posts.content}</div>
      </div>

      <CommentList
        __deleteComment={__deletePostComment}
        commentList={posts.comments}
      />
      <CommentCreate __addComment={__addPostComment} />

      <div>
        <button onClick={() => navigate(-1)}>이전으로</button>
        
        <Footer/>
      </div>
      </Layout>
    </>
  );
};

export default PostDetail;

// 수정 삭제 토글 및 뒤로가기
const EditHead = styled.div`
position : relative;
display: flex;
justify-content: space-between;
padding: 10px;
`

const Tgbutton = styled.button`
  border:none;
  font-weight:600;
  width:50px;
  background-color:white;
`
const ToggleNav = styled.div`
  width : 50px;
  height: 80px;
  position: absolute;
  right : 10px;
  top : 50px;
  `
const Button = styled.button`
  width:50px;
  height:40px;
  margin-bottom:3px;
  border:1px solid #ddd;
  border-radius:5px;
  background-color:#fff;
  &:hover {
    background-color:red;
  }
`