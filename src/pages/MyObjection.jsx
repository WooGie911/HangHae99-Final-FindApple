import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import {__getMyObjection} from '../redux/modules/MypageSlice'
const MyObjection = () => {
  const {mypage} = useSelector((state) => state.mypage)
  console.log(mypage)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyObjection)
  }, [])
  return (
    <div>
      <Header/>
      MyObjection
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
      }
</div>
  )
}

export default MyObjection