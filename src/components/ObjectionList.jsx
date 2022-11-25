import { useDispatch } from "react-redux";
import { __getPost, __getAddObjection } from "../redux/modules/ObjectionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import React, { useState, useEffect, useCallback } from "react";
import { __getPostTime } from "../redux/modules/PostsSlice";
import { useInView } from "react-intersection-observer";

const ObjectionList = ({ posts, detail, __getDetail, state, setState }) => {
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
  /**  서버에서 아이템을 가지고 오는 함수 */
  const obj = {
    page: page,
    state: state,
  };
  const getItems = useCallback(async () => {
    //의존하는 값(deps)들이 바뀌지 않는 한 기존 함수를 재사용할 수 있습니다.
    dispatch(__getAddObjection(obj));
  }, [page, params]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);
  useEffect(() => {
    setState({ ...state, pageNumber: page });
  }, [page]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    setPage(0);
  }, [params]);

  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  onClickHandler(post.issuesId);
                }}
              >
                <PList>
                  <div>
                    {post.images && <img src={post.images[0].imgUrl} />}
                  </div>
                  <br />
                  <div>
                    <label>{post.title}</label>
                    <br />
                    {post.userPrice !== undefined && (
                      <>
                        <label>
                          {post.userPrice.toLocaleString("ko-KR")}원
                        </label>
                      </>
                    )}
                    <br />
                    <label>{post.category}</label>
                    <HeartCreatedAt>
                      <div>{post.createdAt}</div>
                      <div>
                        {" "}
                        <img
                          src="https://img.icons8.com/ios-glyphs/15/null/hearts.png"
                          style={{ width: "10px", height: "10px" }}
                        />
                        {post.likeCnt}
                      </div>
                    </HeartCreatedAt>
                  </div>
                </PList>
              </div>
            </div>
          );
        })}
      <div ref={ref}></div>
      <Div></Div>
    </>
  );
};

export default ObjectionList;

const PList = styled.div`
  border: 1.2px solid gray;
  border-width: 1.2px 0px 1.2px 0px;
  display: flex;
  padding: 15px;
  img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
    border: 1px solid transparent;
  }
`;

// 리스트 하트와 시간
const HeartCreatedAt = styled.div`
  width: 290px;
  display: flex;
  justify-content: space-between;
`;

// 빈공간
const Div = styled.div`
  height: 60px;
`;