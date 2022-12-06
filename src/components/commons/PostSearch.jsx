import React from "react";
import useInput from "../../hook/useInput";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SearchIcon from "../../assets/SearchIcon.svg";

const PostSearch = (props) => {
  const initialState = { searchContent: "" };
  const [search, setSearch, onChangeSearchHandler] = useInput(initialState);
  const dispatch = useDispatch();
  const params = useParams();

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
    <div className="bg-white w-full flex h-[60px] items-center relative px-[18px] text-BB">
      <div className="bg-D9 flex w-full h-[38px] items-center  rounded-lg">
        <img
          className=" h-6 px-1 cursor-pointer"
          src={SearchIcon}
          onClick={() => {
            onClickSubmitButton();
          }}
        />
        <input
          className="bg-transparent ml-1 w-full text-sm h-full rounded-r-lg outline-none "
          placeholder="어떤걸 찾고 있나요?"
          value={search.searchContent || ""}
          name="searchContent"
          type="text"
          onChange={onChangeSearchHandler}
          onKeyPress={keyPress}
        />
      </div>
    </div>
  );
};

export default PostSearch;
