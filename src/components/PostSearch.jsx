import React from "react";
import useInput from "../hook/useInput";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Search from "../assets/search.png"
 

const PostSearch = (props) => {
  const initialState = { searchContent: "" };
  const [search, setSearch, onChangeSearchHandler] = useInput(initialState);
  const dispatch = useDispatch();

  const onClickSubmitButton = (e) => {
    e.preventDefault();
    if (search.searchContent.trim() === "") {
      return alert("검색어를 입력하세요.");
    }
    dispatch(props.__search({ searchContent: search.searchContent }));
    setSearch(initialState);
  };

  return (
    <>
      <div>
        <Input
          placeholder="검색어를 입력하세요 WWW"
          value={search.searchContent || ""}
          name="searchContent"
          type="text"
          onChange={onChangeSearchHandler}
        />

        <button onClick={onClickSubmitButton}>검색</button>
      </div>
    </>
  );
};

export default PostSearch;

// icon 사진 집어넣기
const Input = styled.input`
padding-left: 30px;
height : 35px;
width: 250px;
background-image: url("https://img.icons8.com/ios-glyphs/30/null/search--v1.png");
background-repeat : no-repeat;
background-size: 30px;
`