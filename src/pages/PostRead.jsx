import React, { useEffect } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hook/useInput";
import { __getPost } from "../redux/modules/PostsSlice";

const PostRead = () => {
  const params = useParams();
  console.log("params.category", params.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = { searchContent: "" };
  const [search, setSearch, onChangeSearchHandler] = useInput(initialState);

  const onClickSubmitButton = (e) => {
    e.preventDefault();
    if (search.searchContent.trim() === "") {
      return alert("검색어를 입력하세요.");
    }
    // dispatch(__searchPost({ searchContent: search.searchContent }));
    setSearch(initialState);
  };

  useEffect(() => {
    dispatch(__getPost);
  }, []);

  return (
    <>
      <Header />
      <div>PostRead</div>

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
      <PostList />
    </>
  );
};

export default PostRead;
