import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { APP_ROUTE } from '../constants/routes';

const Login = ({ errors, formData, loginMsg, handleSubmitForm, handleChangeFormData }) => {

    const [isShow, setShow] = useState(false);
    const navigate = useNavigate();

    function showPassword() {
        setShow(!isShow);
    }

    return (
        <div className='login-container'>
            <div className="image-login">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY72nxq7PDnE1-VmJySKBYGboeYT-QBTU164jlpWhXV_PoOGHic-2wExvD6Arvf6yVww&usqp=CAU" alt="" />
            </div>
            <form className="login-form"
                onSubmit={handleSubmitForm}
            >
                <p className='title'>Login</p>
                <div className="form-item">
                    <label htmlFor="">Email</label>
                    <input type="email" className="form-field"
                        name='email'
                        value={formData.email}
                        onChange={handleChangeFormData}
                    />
                    <p className='login_err_msg'>{errors.email || ''}</p>
                </div>
                <div className="form-item">
                    <label htmlFor="">Password</label>
                    <input type={isShow ? "text" : "password"} className="form-field"
                        name='password'
                        value={formData.showPassword}
                        onChange={handleChangeFormData}
                    />
                    <span id='eye-icon'
                        onClick={showPassword}
                    >
                        {isShow ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                    <p className='login_err_msg'>{errors.password || ''}</p>
                </div>
                <div className="login-msg">{loginMsg || ''}</div>
                <input type="submit" value="Login" />
                <div className="register-btn"
                    onClick={() => {
                        navigate(APP_ROUTE.REGISTER)
                    }}
                >Register</div>
                <Link className='forgot-password'>Forgot password?</Link>
            </form>
        </div>
    )
}

export default Login
