import React, { useEffect, useState } from 'react'
import PostDetails from '../../components/Global/PostDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostByIdApi, getRecentPostsApi } from '../../api/post.api';
import { getFiveLatestGymsApi } from '../../api/gym.api';
import { APP_ROUTE } from '../../constants/routes';

const PostDetailsContainer = () => {

  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    status: '',
    image: '',
    created_at: '',
    updated_at: '',
    user: {}
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentGyms, setRecentGyms] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

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
    if (post.status && post.status === "reject") {
      navigate(APP_ROUTE.HOME);
    }
    //eslint-disable-next-line
  }, [post])

  useEffect(() => {
    const postId = param.id;
    getPostByIdApi(postId)
      .then(res => {
        const data = res.data.data[0]
        const obj = {...post}
        for(let key in data){
          if(Object.hasOwnProperty.call(post, key)){
            obj[key] = data[key];
          }
        }
        setPost(obj);
      })
      .catch(err => {
        console.log(err)
      })
      //eslint-disable-next-line
  }, [param])

  return (
    <PostDetails post={post} recentPosts={recentPosts} recentGyms={recentGyms} />
  )
}

export default PostDetailsContainer