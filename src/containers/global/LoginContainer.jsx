import React, {useEffect, useState} from 'react'
import Login from '../../components/Global/Login'
import { loginUserApi } from '../../api/auth.api'
import {useDispatch, useSelector} from 'react-redux'
import { addUserInfo } from '../../redux/slice/auth.slice'
import {useNavigate} from "react-router-dom";
import {authSelector} from "../../redux/selector";

const LoginContainer = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: null,
    password: null
  });
  const [loginMsg, setLoginMsg] = useState();

  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeFormData = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }
  };
  const validateForm = ({ email, password }) => {
    let emailLength = email.trim().length;
    let passwordLength = password.trim().length;
    const err = { email: null, password: null }

    if (emailLength > 0 && passwordLength > 0) {
      setErrors({
        ...err, email: null, password: null
      })
      return true;
    }

    if (emailLength === 0) {
      err.email = "Email can't not be blank!"
    }

    if (passwordLength === 0) {
      err.password = "Password can't not be blank!"
    }

    setErrors(err);
    return false;
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validForm = validateForm(formData);
    validForm && loginUserApi({ email: formData.email, password: formData.password })
      .then(res => {
        dispatch(addUserInfo(res.data.data));
        navigate('/')
      })
      .catch(err => {
        setLoginMsg(err.response.data.message);
        console.log(err)
      })
  }

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [navigate, user])

  useEffect(() => {
    setLoginMsg('')
  }, [formData])

  return (
    <>
      <Login
        errors={errors}
        formData={formData}
        loginMsg={loginMsg}
        handleSubmitForm={handleSubmitForm}
        handleChangeFormData={handleChangeFormData}
      />
    </>
  )
}

export default LoginContainer