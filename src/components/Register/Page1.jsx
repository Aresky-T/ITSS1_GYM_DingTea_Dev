import React from 'react'

const Page1 = ({ formik }) => {

  return (
    <>
      <div className="register__field">
        <label htmlFor='rgf-name'>Name</label>
        <input type="text" name="name" id="rgf-name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-email'>Email</label>
        <input type="email" name="email" id="rgf-email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-address'>Address</label>
        <input type="text" name="address" id="rgf-address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-phone-number'>Phone number</label>
        <input type="text" name="phone_num" id="rgf-phone-number"
          value={formik.values.phone_num}
          onChange={formik.handleChange}
        />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-password'>Password</label>
        <input type="password" name="password" id="rgf-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      <div className="register__field">
        <label htmlFor='rgf-confirm-password'>Confirm password</label>
        <input type="password" name="confirmPassword" id="rgf-confirm-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </div>
    </>
  )
}

export default Page1