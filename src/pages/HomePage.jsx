import React from 'react'
import HomeContainer from '../containers/global/HomeContainer'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    document.title = "Gym Finder"
  })
  
  return (
    <>
      <HomeContainer/>
    </>
  )
}

export default HomePage