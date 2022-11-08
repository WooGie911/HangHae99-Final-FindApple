import React from 'react'
import Header from "../components/Header"
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'

const Mypage = () => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate("/mypageupdate")
  }
  return (
    <div><Header/>
    <div>
      내가 올린 게시글
    </div>
    <div>
      이의제기
    </div>
    <div>
      찜목록
    </div>
    <div>
      <button onClick={onClickHandler}>정보수정</button>
    </div>
    </div>
  )
}

export default Mypage