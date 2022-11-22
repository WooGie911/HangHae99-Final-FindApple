import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import photoIMG from "../assets/photoIMG.png";
import styled from "styled-components";

const Comment = ({comment, __deleteComment}) => {
  const { post } = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const onDeleteButton = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteComment(payload));
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
  return (
    <div>
          <StContainer>

            <Buttons>
              <div>
            <img
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                float: "left",
                marginRight: 10
              }}
              src={
                post.avatarUrl == (null || undefined)
                  ? photoIMG
                  : post.avatarUrl
              }
            />
              <span>{comment.nickname} </span>
              </div>
              <Tgbutton onClick={editToggleHandler}>···</Tgbutton>
          {editTg.isEdit === true ? (
          <Button onClick={() => onDeleteButton(comment.id)}>
                삭제
              </Button>
          ) : null}
          
          </Buttons>

              </StContainer>
              <span> {comment.comment}</span>
              <hr/>
              
            </div>

  )
}

export default Comment
// 전체 컨테이너
const StContainer = styled.div`
width: 100%;
height: 50px;
position: relative;
`


//삭제 토글
const Buttons = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
height: 40px;
`

const Tgbutton = styled.button`
  border: none;
  font-weight: 600;
  width: 50px;
  background-color: white;
`;

const Button = styled.button`
  position : absolute;
  top : 40px;
  right : 0px;
  width: 50px;
  height: 40px;
  /* margin-bottom: 3px; */
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: red;
  }
`;