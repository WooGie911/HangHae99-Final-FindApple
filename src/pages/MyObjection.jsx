import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import {__getObjection} from '../redux/modules/ObjectionsSlice'
const MyObjection = () => {
  const {objections} = useSelector((state) => state.objections)
  console.log(objections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getObjection)
  }, [])
  return (
    <div>
      <Header/>
      MyObjection
      {
        objections !== undefined && (
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