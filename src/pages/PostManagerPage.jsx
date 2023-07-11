import React from 'react'
import PostManagerContainer from '../containers/admin/PostManagerContainer'
import { useEffect } from 'react'

const PostManagerPage = () => {
    useEffect(() => {
        document.title = "Admin | Post Manager"
    })

    return (
        <PostManagerContainer />
    )
}

export default PostManagerPage