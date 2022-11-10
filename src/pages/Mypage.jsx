import React, {useEffect} from 'react'
import Header from "../components/Header"
import styled from "styled-components"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {__UserProfile} from '../redux/modules/LoginSlice'


const Mypage = () => {
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
  const mylike = () => {
    navigate("/mylike")
  }
  const dispatch = useDispatch()
  // const {profile} = useSelector((state) => state.login)
    //get 해오기
    useEffect(() => {
      dispatch(__UserProfile);
    }, [dispatch]);
  return (
    <div><Header/>
    <div>
    <button onClick={mypost}>내가 올린 게시글</button>
    </div>
    <div>
    <button onClick={myobjection}>이의제기</button>
    </div>
    <div>
    <button onClick={mylike}>찜하기</button>
    </div>
    <div>
      <button onClick={mypageupdate}>정보수정</button>
    </div>
    </div>
  )
}

export default Mypage