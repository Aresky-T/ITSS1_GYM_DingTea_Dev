import React from 'react'
import CreatePostContainer from '../containers/gym/CreatePostContainer'
import { useEffect } from 'react'

const CreatePostPage = () => {
  useEffect(() => {
    document.title = "Gym Finder | Create Post"
  })

  return (
    <CreatePostContainer/>
  )
}

export default CreatePostPage