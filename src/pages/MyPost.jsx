import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getMyPost } from '../redux/modules/MypageSlice'

const MyPost = () => {
  const {posts} = useSelector((state) => state.mypage)
  console.log(posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getMyPost)
  }, [])
  return (
    <div>
      <Header/>
      MyPost
      {
        posts.length > 0 && (
          <>
        {posts.map((post) => {
        return <div>
          {post.image}
          {post.title}
        </div>
      })}
          </>
        )
      }

      </div>
  )
}

export default MyPost