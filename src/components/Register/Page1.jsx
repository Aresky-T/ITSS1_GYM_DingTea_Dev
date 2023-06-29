import React from 'react'

const Page1 = ({ page1 }) => {

  return (
    <>
      <div className="register__field">
        <label htmlFor='rgf-name'>Name</label>
        <input type="text" name="name" id="rgf-name"
          value={page1.values.name}
          onChange={page1.handleChange}
        />
          {page1.errors.name && <p className="reg_page1_err">{page1.errors.name}</p>}
      </div>
      <div className="register__field">
        <label htmlFor='rgf-email'>Email</label>
        <input type="email" name="email" id="rgf-email"
          value={page1.values.email}
          onChange={page1.handleChange}
        />
          {page1.errors.email && <p className="reg_page1_err">{page1.errors.email}</p>}
      </div>
      <div className="register__field">
        <label htmlFor='rgf-address'>Address</label>
        <input type="text" name="address" id="rgf-address"
          value={page1.values.address}
          onChange={page1.handleChange}
        />
          {page1.errors.address && <p className="reg_page1_err">{page1.errors.address}</p>}
      </div>
      <div className="register__field">
        <label htmlFor='rgf-phone-number'>Phone number</label>
        <input type="text" name="phone_num" id="rgf-phone-number"
          value={page1.values.phone_num}
          onChange={page1.handleChange}
        />
          {page1.errors.phone_num && <p className="reg_page1_err">{page1.errors.phone_num}</p>}
      </div>
      <div className="register__field">
        <label htmlFor='rgf-password'>Password</label>
        <input type="password" name="password" id="rgf-password"
          value={page1.values.password}
          onChange={page1.handleChange}
        />
          {page1.errors.password && <p className="reg_page1_err">{page1.errors.password}</p>}
      </div>
      <div className="register__field">
        <label htmlFor='rgf-confirm-password'>Confirm password</label>
        <input type="password" name="confirmPassword" id="rgf-confirm-password"
          value={page1.values.confirmPassword}
          onChange={page1.handleChange}
        />
          {page1.errors.confirmPassword && <p className="reg_page1_err">{page1.errors.confirmPassword}</p>}
      </div>
    </>
  )
}

export default Page1