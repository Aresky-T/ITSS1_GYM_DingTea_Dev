import React, { useState } from "react";
import Page1 from "./Register/Page1"
import Page2 from "./Register/Page2"

const Register = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeCurrentPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='register-container'>
      <h1 className="register__title">
        Register
      </h1>
      {currentPage === 1 ?
        <div className="register__p1">
          <Page1/>
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
          <Page2/>
          <button
            className="register__btn"
          >Save</button>
        </div>
      }
    </div>
  )
}

export default Register