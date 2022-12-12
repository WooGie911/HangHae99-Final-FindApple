import { useDispatch, useSelector } from "react-redux";
import {
  __getPost,
  __getAddObjection,
} from "../../redux/modules/ObjectionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { __getPostTime } from "../../redux/modules/PostsSlice";
import { useInView } from "react-intersection-observer";
import bookmark8D from "../../assets/bookmark8D.png";

const ObjectionList = ({
  posts,
  detail,
  __getDetail,
  search,
  getState,
  __getPost,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const onClickHandler = (data) => {
    dispatch(__getDetail(data));
    navigate(`${detail}/${data}`);
  };

  const [page, setPage] = useState(0); //페이지수
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    setPage(0);
    dispatch(search(""));
  }, [params]);

  useEffect(() => {
    setPage(0);
  }, [getState.searchObj]);

  /**  서버에서 아이템을 가지고 오는 함수 */
  const getItems = useCallback(async () => {
    const paramCategoryObj =
      params.category === "all"
        ? params.category
        : `category/${params.category}`;

    const searchString = getState.searchObj.replace("/", "");

    const checkSearchObj =
      searchString === "" ? searchString : `/${searchString}`;

    const submitObj = {
      categoryObj: paramCategoryObj,
      pageNumberObj: page,
      pageSizeObj: 10,
      sortObj: params.sort,
      searchObj: checkSearchObj,
    };
    //의존하는 값(deps)들이 바뀌지 않는 한 기존 함수를 재사용할 수 있습니다.
    dispatch(__getPost(submitObj));
  }, [page, params, getState.searchObj]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <div>
        {posts?.length > 0 &&
          posts?.map((post, index) => {
            return (
              <div
                className="bg-white flex p-[18px] border-b-[0.5px] border-D9 cursor-pointer"
                key={index}
                onClick={() => {
                  onClickHandler(post?.issuesId);
                }}
              >
                <img
                  className="object-cover min-w-[84px] w-[84px] h-[84px] rounded"
                  src={post?.images[0]?.imgUrl}
                />

                <div className=" w-full flex-col  ml-3 font-medium">
                  <div>
                    <label>{post?.title}</label>
                  </div>
                  <div className=" mt-1 text-base font-semibold">
                    <label>{post?.userPrice?.toLocaleString("ko-KR")}원</label>
                  </div>
                  <div className="flex justify-between mt-4 text-DD  text-xs font-normal">
                    <div>{post?.createdAt}</div>
                    <div className="flex items-center">
                      <img className="h-3 mr-1" src={bookmark8D} />
                      <div className="mx-[1px]">{post?.likeCnt}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div ref={ref}></div>
      <div className="h-16" />
    </>
  );
};

export default ObjectionList;
