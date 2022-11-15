import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getMyPost } from '../redux/modules/MypageSlice'

const MyPost = () => {
  const {posts} = useSelector((state) => state.mypage)
  console.log(posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyPost())
  }, [])
  return (
    <div>
      <Header/>
      MyPost
      {
        posts.length > 0 && (
          <div>
        {posts.map((post) => {
        return <div key={post.postId}>
          <img src={post.images[0].imgUrl}/>
          <div>{post.title}</div>
          <div>{post.userPrice}</div>
        </div>
      })}
          </div>
        )
      }

      </div>
  )
}

export default MyPost