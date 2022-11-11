import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getMyLike } from '../redux/modules/MypageSlice'

const MyLike = () => {
  const {mypage} = useSelector((state) => state.mypage)
  console.log(mypage)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyLike)
  }, [])
  return (
    <div>
      <Header/>
      MyLike
      {
        mypage !== undefined && (
          <>
        {mypage.map((item) => {
        return <div>
          {item.image}
          {item.title}
        </div>
      })}
          </>
        )
      }</div>
  )
}

export default MyLike