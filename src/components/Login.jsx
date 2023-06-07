import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast'

const Login = ({formik}) => {

    const [isShow, setShow] = useState(false);

    function showPassword (){
        setShow(!isShow);
    }

    return (
        <div className='login container'>
            <div className="image-login">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY72nxq7PDnE1-VmJySKBYGboeYT-QBTU164jlpWhXV_PoOGHic-2wExvD6Arvf6yVww&usqp=CAU" alt="" />
            </div>
            <form className="login-form"
                onSubmit={formik.handleSubmit}
            >
                <p className='title'>LOGIN</p>
                <div className="form-item">
                    <label htmlFor="">Email:</label>
                    <input type="text" className="form-field" 
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="">Password:</label>
                    <input type={isShow ? "text" : "password"} className="form-field" 
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <span id='eye-icon'
                        onClick={showPassword}
                    >
                        {isShow ? <AiFillEye/> : <AiFillEyeInvisible />}
                    </span>
                </div>
                <Link className='forgot-password'>Forgot password?</Link>
                <input type="submit" value="Login" />
                <div className="sign-up-link">Don't have an account? <Link to="/auth/register">Sign up</Link></div>
            </form>
        </div>
    )
}

export default Login
