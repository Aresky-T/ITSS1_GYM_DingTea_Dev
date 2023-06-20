import { useFormik } from 'formik'
import React from 'react'

const Page1 = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <>
      <div className="register__field">
        <label htmlFor='rgf-name'>Name</label>
        <input type="text" name="name" id="rgf-name" />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-email'>Email</label>
        <input type="email" name="email" id="rgf-email" />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-address'>Address</label>
        <input type="text" name="address" id="rgf-address" />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-phone-number'>Phone number</label>
        <input type="text" name="phoneNumber" id="rgf-phone-number" />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-password'>Password</label>
        <input type="password" name="password" id="rgf-password" />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-confirm-password'>Confirm password</label>
        <input type="password" name="confirmPassword" id="rgf-confirm-password" />
      </div>
    </>
  )
}

export default Page1