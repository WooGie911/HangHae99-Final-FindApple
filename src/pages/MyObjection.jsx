import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import {__getMyObjection} from '../redux/modules/MypageSlice'
const MyObjection = () => {
  const {objections} = useSelector((state) => state.mypage)
  console.log(objections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyObjection)
  }, [])
  return (
    <div>
      <Header/>
      MyObjection
      {
        objections.length > 0 && (
          <>
                {objections.map((objection) => {
        return <div>
          {objection.image}
          {objection.title}
        </div>
      })}
          </>
        )
      }
</div>
  )
}

export default MyObjection