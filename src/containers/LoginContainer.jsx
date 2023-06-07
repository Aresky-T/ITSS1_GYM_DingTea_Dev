import React from 'react'
import Login from '../components/Login'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'

const LoginContainer = () => {

  // const yup = require("yup");

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    // validationSchema: yup.object().shape({
    //   email: yup.string().required("Required"),
    //   password: yup.string().required("Required")
    // }),
    onSubmit: values => {
      console.log(values)
      if(!values.email || values.email.trim().length === 0) {
        toast.error("Email is required!")
      }
      if(!values.password || values.password.trim().length === 0){
        toast.error("Password is required!")
      }
    }
  })


  return (
    <>
      <Login formik={formik}/>
    </>
  )
}

export default LoginContainer