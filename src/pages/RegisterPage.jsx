import React, { useEffect } from 'react'
import RegisterContainer from '../containers/global/RegisterContainer'
const RegisterPage = () => {
  useEffect(() => {
    document.title = "Gym Finder | Register"
  })

  return (
    <RegisterContainer />
  )
}

export default RegisterPage