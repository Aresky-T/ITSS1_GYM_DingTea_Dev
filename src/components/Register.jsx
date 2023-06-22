import React, { useState } from "react";
import Page1 from "./Register/Page1"
import Page2 from "./Register/Page2"
import { useFormik } from "formik";
import * as yup from 'yup';
import { REGEX } from "../constants/regex";

const Register = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone_num: '',
      address: '',
      description: '',
      logoFile: [],
      imageFiles: [],
      type: 2,
      options: []
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Required email").matches(REGEX.REGEX_EMAIL, 'Invalid email, try again!'),
      password: yup.string().required("Required password").matches(REGEX.REGEX_PASSWORD, 'The password must contain both numbers and letters, without any special characters!'),
      confirmPassword: yup.string().required("Required confirm password").oneOf([yup.ref('password'), null], 'The confirmation password does not match the password!'),
      name: yup.string().required("Required name").matches(REGEX.REGEX_STRING, "Invalid name!"),
      address: yup.string().required("Required address").matches(REGEX.REGEX_STRING, "Invalid address!"),
      description: yup.string().required("Required description").matches(REGEX.REGEX_STRING, 'Invalid description!'),
      // logo: yup.string().required("Required logo").matches(REGEX.REGEX_STRING, 'Invalid logo!'),
      // image1: yup.string().required("Required image1").matches(REGEX.REGEX_STRING, 'Invalid image1!'),
      // image2: yup.string().required("Required image2").matches(REGEX.REGEX_STRING, 'Invalid image2!'),
      // image3: yup.string().required("Required image3").matches(REGEX.REGEX_STRING, 'Invalid image3!'),
    }),
    onSubmit: values => {
      console.log(values)
      console.log(formik.errors)
    }
  })

  const handleChangeCurrentPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <form className='register-container'
      onSubmit={formik.handleSubmit}
    >
      <h1 className="register__title">
        Register
      </h1>
      {currentPage === 1 ?
        <div className="register__p1">
          <Page1 formik={formik} />
          <button
            onClick={() => handleChangeCurrentPage(2)}
            className="register__btn"
          >Next</button>
        </div>
        :
        <div className="register__p2">
          <button
            onClick={() => handleChangeCurrentPage(1)}
            className="btn--back"
          >back</button>
          <Page2 formik={formik} />
          <button
            className="register__btn"
            type="submit"
          >Save</button>
        </div>
      }
    </form>
  )
}

export default Register