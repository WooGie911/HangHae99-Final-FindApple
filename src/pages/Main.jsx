import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

const Main = () => {
  return (
    <>
      <Header />
      <div>
        <input>검색창</input>
        <button>검색</button>
      </div>
      <PostList />
    </>
  );
};

export default Main;
