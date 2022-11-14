import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import { __getSellerinfo} from '../redux/modules/SellerSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const SellerPage = () => {
  const {myPostList, sellerInfoDto} = useSelector((state) => state.sellerpage)
  const params = useParams()
  const dispatch = useDispatch()
  const nickname = params.nickname
  useEffect(() => {
    dispatch(__getSellerinfo(params.nickname))
  }, [nickname])
  return (
    <div>
      <Header/>
      <img src={sellerInfoDto.profileImg}/>
      <div>판매자 닉네임</div>
      {sellerInfoDto.nickname}
      <div>판매자 이메일</div>
      {sellerInfoDto.email}
      <div>물건 리스트
        {
          myPostList !== undefined && (
            <>
            {myPostList.map((mypost) => {
              return (
                <div key={mypost.postId}>
                {/* <div>{myPostList.image}</div> */}
                <div>{mypost.title}</div>
                {/* <div>{myPostList.product}</div> */}
                <div>{mypost.userPrice}</div>
                </div>
              )
            })}

            </>
          )
        }
        
      </div>
    </div>
  )
}

export default SellerPage