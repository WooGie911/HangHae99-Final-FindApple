import React from 'react'
import Header from "../components/Header"
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Mypage = () => {
  // const {profile} = useSelector((state) => state.login)
  const navigate = useNavigate()
  const mypageupdate = () => {
    navigate("/mypageupdate")
  }
  const mypost = () => {
    navigate("/mypost")
  }
  const myobjection = () => {
    navigate("/myobjection")
  }
  const mycart = () => {
    navigate("/mycart")
  }
  return (
    <div><Header/>
    <div>
    <button onClick={mypost}>내가 올린 게시글</button>
    </div>
    <div>
    <button onClick={myobjection}>이의제기</button>
    </div>
    <div>
    <button onClick={mycart}>찜하기</button>
    </div>
    <div>
      <button onClick={mypageupdate}>정보수정</button>
    </div>
    </div>
  )
}

export default Mypage