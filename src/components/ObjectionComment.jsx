import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import styled from "styled-components";
import threedots from "../assets/threedots.png";

const ObjectionComment = ({comment, __deleteObjectionComment}) => {
  const dispatch = useDispatch();
  const onDeleteButton = (payload) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteObjectionComment(payload));
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
            <div>{comment.nickname} </div>
            <Cmnt> {comment.issuesComment}</Cmnt>
          </div>
          <Tgbutton src={threedots} onClick={editToggleHandler} />
          {editTg.isEdit === true ? (
            <Button onClick={() => onDeleteButton(comment.id)}>삭제</Button>
          ) : null}
        </Buttons>
      </StContainer>
      <hr />
    </div>
  )
}

export default ObjectionComment
// 전체 컨테이너
const StContainer = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

//삭제 토글
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  div {
    width: 300px;
  }
`;

const Tgbutton = styled.img`
  width: 23px;
  height: 23px;
`;

const Button = styled.button`
  position: absolute;
  top: 40px;
  right: 0px;
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

const Cmnt = styled.div`
  font-size: 12px;
`;