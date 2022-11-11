import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import { __getMyPost, __getMyObjection, __getMyLike } from '../redux/modules/MypageSlice'
import { useDispatch } from 'react-redux'

const SellerPage = () => {
  const {seller, sellerPost, sellerPostList} = useSelector((state) => state.sellerpage)
  console.log(seller, sellerPost, sellerPostList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyPost())
    dispatch(__getMyObjection())
    dispatch(__getMyLike())
  }, [])
  return (
    <div>
      <Header/>
      <div>판매자 프로필
      {seller.image}
      </div>
      <div>판매자 닉네임</div>
      {seller.nickname}
      <div>판매 물건
      {sellerPost}
      </div>
      <div>물건 리스트
        {
          sellerPostList.length > 0 && (
            <>
            {sellerPostList.map((list) => {
          return <div key={list.id}>
            {list.image}
          </div>
        })}
            </>
          )
        }
        
      </div>
    </div>
  )
}

export default SellerPage