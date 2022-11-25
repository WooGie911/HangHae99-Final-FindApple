import React from "react";
import useInput from "../hook/useInput";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "../assets/BackIcon.svg";
import SearchIcon from "../assets/SearchIcon.svg";

const PostSearch = (props) => {
  const initialState = { searchContent: "" };
  const [search, setSearch, onChangeSearchHandler] = useInput(initialState);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const onClickSubmitButton = () => {
    if (search.searchContent.trim() === "") {
      return alert("검색어를 입력하세요.");
    }

    const paramObj =
      params.category === "all"
        ? params.category
        : `category/${params.category}`;

    const submitObj = {
      paramObj: paramObj,
      searchObj: search.searchContent,
      pageNumber: 0,
      pageSize: 10,
      postSort: params.sort,
    };

    dispatch(props.__search(submitObj));
    setSearch(initialState);
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      onClickSubmitButton();
    }
  };
  return (
    <>
      <Div>
        <BackDiv>
          <img
            src={BackIcon}
            onClick={() => {
              navigate(-1);
            }}
          />
        </BackDiv>
        <InputDiv>
          <img
            src={SearchIcon}
            onClick={() => {
              onClickSubmitButton();
            }}
          />
          <Input
            placeholder="어떤걸 찾고 있나요?"
            value={search.searchContent || ""}
            name="searchContent"
            type="text"
            onChange={onChangeSearchHandler}
            onKeyPress={keyPress}
          />
        </InputDiv>
      </Div>
    </>
  );
};

export default PostSearch;

const Div = styled.div`
  display: flex;
  width: 100%;
  min-width: 375px;
  height: 60px;
  position: relative;
  align-items: center;
`;

const BackDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  img {
    height: 40px;
    width: 40px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 78%;
  height: 38px;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #d9d9d9;
  img {
    height: 80%;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  border-radius: 10px;
  background: #d9d9d9;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  outline: none;
`;
