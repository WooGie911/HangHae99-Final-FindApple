import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getMyLike } from '../redux/modules/MypageSlice'

const MyLike = () => {
  const {likes} = useSelector((state) => state.mypage)
  console.log(likes)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyLike)
  }, [])
  return (
    <div>
      <Header/>
      MyLike
      {
        likes.length > 0 && (
          <>
        {likes.map((like) => {
        return <div>
          {like.image}
          {like.title}
        </div>
      })}
          </>
        )
      }</div>
  )
}

export default MyLike