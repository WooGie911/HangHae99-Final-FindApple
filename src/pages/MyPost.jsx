import React, {useEffect} from 'react'
import Header from "../components/Header"
import { useSelector, useDispatch } from 'react-redux'
import { __getPost } from '../redux/modules/PostsSlice'

const MyPost = () => {
  const {posts} = useSelector((state) => state.posts)
  console.log(posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(__getPost)
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