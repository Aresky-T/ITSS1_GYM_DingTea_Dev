import React from 'react'
import Home from '../components/Home'
import { useState } from 'react'
import { getAllPostsApi } from '../api/post.api';
import { useEffect } from 'react';
import { getFiveLatestGymsApi } from '../api/gym.api';

const HomeContainer = () => {

  const [posts, setPosts] = useState([]);
  const [gyms, setGyms] = useState([]);

  function getAllPost () {
    getAllPostsApi()
    .then(res => {
      setPosts(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function getFiveLatestGyms () {
    getFiveLatestGymsApi()
    .then(res => {
      setGyms(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getAllPost();
    getFiveLatestGyms();
  }, [])

  return (
    <>
      <Home posts={posts} gyms={gyms}/>
    </>
  )
}

export default HomeContainer