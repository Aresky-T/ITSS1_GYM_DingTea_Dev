import React from 'react'
import GymDetailsContainer from '../containers/global/GymDetailsContainer'
import { useEffect } from 'react'

const GymDetailsPage = () => {
  useEffect(() => {
    document.title = "Gym Finder | Gym"
  })

  return (
    <><GymDetailsContainer/></>
  )
}

export default GymDetailsPage