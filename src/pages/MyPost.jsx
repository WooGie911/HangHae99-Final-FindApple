import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getMyPost } from '../redux/modules/MypageSlice'

const MyPost = () => {
  const {mypage} = useSelector((state) => state.mypage)
  console.log(mypage)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyPost)
  }, [])
  return (
    <div>
      <Header/>
      MyPost
      {
        mypage.length > 0 && (
          <>
        {mypage.map((item) => {
        return <div>
          {item.image}
          {item.title}
        </div>
      })}
          </>
        )
      }

      </div>
  )
}

export default MyPost