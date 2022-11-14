import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import { __getSellerinfo} from '../redux/modules/SellerSlice'
import { useDispatch } from 'react-redux'

const SellerPage = () => {
  const {seller} = useSelector((state) => state.sellerpage)
  console.log(seller)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getSellerinfo(seller.nickname))
  }, [])
  return (
    <div>
      <Header/>
      <div>판매자 프로필
      {seller.profileImg}
      </div>
      <div>판매자 닉네임</div>
      {seller.nickname}
      <div>판매자 이메일</div>
      {seller.email}
      <div>물건 리스트
        {
          seller !== undefined && (
            <>
            <div>{seller.image}</div>
            <div>{seller.title}</div>
            <div>{seller.product}</div>
            <div>{seller.price}</div>
            </>
          )
        }
        
      </div>
    </div>
  )
}

export default SellerPage