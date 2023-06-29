import React, { useEffect, useState } from 'react'
import PostDetails from '../../components/Global/PostDetails'
import { useParams } from 'react-router-dom'
import { getPostByIdApi, getRecentPostsApi } from '../../api/post.api';
import { getFiveLatestGymsApi } from '../../api/gym.api';

const PostDetailsContainer = () => {

  const [post, setPost] = useState();
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentGyms, setRecentGyms] = useState([]);
  const param = useParams();

  useEffect(() => {
    getRecentPostsApi()
      .then(res => {
        setRecentPosts(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })


    getFiveLatestGymsApi()
      .then(res => {
        setRecentGyms(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const postId = param.id;
    getPostByIdApi(postId)
      .then(res => {
        setPost(res.data.data[0]);
      })
      .catch(err => {
        console.log(err)
      })
  }, [param])

  return (
    <PostDetails post={post} recentPosts={recentPosts} recentGyms={recentGyms}/>
  )
}

export default PostDetailsContainer