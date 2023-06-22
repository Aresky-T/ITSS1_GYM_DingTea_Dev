import React, {useEffect} from 'react'
import Register from '../components/Register'
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";
import {useNavigate} from "react-router-dom";

const RegisterContainer = () => {
  const user = useSelector(authSelector);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [navigate, user])

  return (
    <Register
    />
  )
}

export default RegisterContainer