import React from 'react'
import PostDetailsContainer from '../containers/global/PostDetailsContainer'
import { useEffect } from 'react'

const PostDetailsPage = () => {
  useEffect(() => {
    document.title = "Gym Finder | Post"
  })
  
  return (
    <><PostDetailsContainer /></>
  )
}

export default PostDetailsPage