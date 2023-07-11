import React from 'react'
import LoginContainer from '../containers/global/LoginContainer';
import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    document.title = "Gym Finder | Login"
  })

  return <LoginContainer />
}

export default LoginPage