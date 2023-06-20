import React from 'react'
import CreatePost from '../components/CreatePost'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import { useEffect } from 'react'
import * as yup from 'yup'

const CreatePostContainer = () => {

  const user = useSelector(authSelector)

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      status: 1,
      image: '',
      user_id: null
    },
    onsubmit: (values) => {
      
    }
  })

  useEffect(() => {
    if(user) {
      formik.setValues({
        ...formik.values,
        user_id: user.id
      })
    }
    //eslint-disable-next-line
  }, [user])

  return (
    <CreatePost formik={formik}/>
  )
}

export default CreatePostContainer