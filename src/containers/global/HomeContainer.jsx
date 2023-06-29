import React from 'react'
import Home from '../../components/Global/Home'
import { useState } from 'react'
import { getRecentPostsApi } from '../../api/post.api';
import { useEffect } from 'react';
import { getFiveLatestGymsApi } from '../../api/gym.api';
import { scrollToTop } from '../../util/AppUtils.js';

const HomeContainer = () => {

  const [posts, setPosts] = useState([]);
  const [gyms, setGyms] = useState([]);

  function getAllPost() {
    getRecentPostsApi()
      .then(res => {
        setPosts(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function getFiveLatestGyms() {
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


  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Home posts={posts} gyms={gyms} />
  )
}

export default HomeContainer