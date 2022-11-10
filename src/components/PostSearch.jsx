import React from "react";
import useInput from "../hook/useInput";
import { useDispatch } from "react-redux";

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
      <div>PostSearch컴포넌트</div>
      <div>
        <input
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
