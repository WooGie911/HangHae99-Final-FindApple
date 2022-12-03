import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPostDetail } from "../../redux/modules/PostDetailsSlice";
import { __getPost } from "../../redux/modules/PostsSlice";
import mainHeart from "../../assets/mainHeart.svg";

const MainList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HeaderState = {
    paramObj: "all",
    pageNumber: 0,
    pageSize: 5,
    postSort: "postLikeCnt",
  };
  const [submitOBJ, setSubmitOBJ] = useState(HeaderState);
  const [headerBarState, setHeaderBarState] = useState("all");
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);

  const onClickCategoryHandler = (data) => {
    setHeaderBarState(data);
    const paramObj = data === "all" ? data : `category/${data}`;
    setSubmitOBJ({ ...submitOBJ, paramObj: paramObj });
  };

  const onClickHandler = (data) => {
    dispatch(__getPostDetail(data));
    navigate(`/PostDetail/${data}`);
  };

  useEffect(() => {
    dispatch(__getPost(submitOBJ));
  }, [submitOBJ]);

  return (
    <>
      <div className="bg-transparent flex p-2 px-[18px] py-4 text-sm">
        {headerBarState === "all" ? (
          <button
            className="bg-DD w-[55px] h-[23px] text-white rounded-2xl border-[1px] border-DD"
            src="https://img.icons8.com/external-regular-kawalan-studio/24/null/external-oval-shape-regular-kawalan-studio.png"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </button>
        ) : (
          <button
            className="bg-transparent w-[55px] h-[23px] text-DD rounded-2xl border-[1px] border-DD"
            src="https://img.icons8.com/external-regular-kawalan-studio/24/null/external-oval-shape-regular-kawalan-studio.png"
            onClick={() => {
              onClickCategoryHandler("all");
            }}
          >
            전체
          </button>
        )}
        {headerBarState === "macbook" ? (
          <button
            className=" ml-2 bg-DD w-[86px] h-[23px]  text-white rounded-2xl border-[1px] border-DD"
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </button>
        ) : (
          <button
            className="ml-2 bg-transparent w-[86px] h-[23px] text-DD rounded-2xl border-[1px] border-DD"
            onClick={() => {
              onClickCategoryHandler("macbook");
            }}
          >
            MacBook
          </button>
        )}
        {headerBarState === "iphone" ? (
          <button
            className="ml-2 bg-DD w-[86px] h-[23px]  text-white rounded-2xl border-[1px] border-DD"
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </button>
        ) : (
          <button
            className="ml-2 bg-transparent w-[86px] h-[23px] text-DD rounded-2xl border-[1px] border-DD"
            onClick={() => {
              onClickCategoryHandler("iphone");
            }}
          >
            iPhone
          </button>
        )}
      </div>
      <div className="p-[18px]">
        {posts &&
          posts.map((post, index) => {
            return (
              <div
                className="bg-white flex p-3 mb-3 rounded drop-shadow-xl"
                key={index}
                onClick={() => {
                  onClickHandler(post.postId);
                }}
              >
                {post.images && (
                  <img
                    className="object-cover  min-w-[84px] w-[84px] h-[84px]  rounded"
                    src={post.images[0].imgUrl}
                  />
                )}

                <div className=" w-full flex-col  ml-3 font-semibold">
                  <div>
                    <label>{post.userPrice.toLocaleString("ko-KR")}원</label>
                  </div>
                  <div className=" mt-1 text-sm font-medium">
                    <label>{post.category}</label>
                  </div>
                  <div className="flex justify-between mt-4  text-xs font-normal">
                    <div>{post.createdAt}</div>
                    <div className="flex">
                      <img src={mainHeart} />
                      <div>{post.likeCnt}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MainList;
