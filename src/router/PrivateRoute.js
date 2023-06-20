import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";
import {useLocation, useNavigate} from "react-router-dom";

export const handleScrollToTop = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}

const PrivateRoute = (props) => {
    const user = useSelector(authSelector);
    const navigate = useNavigate();
    const location = useLocation();

    if(!user){
        navigate('/login')
    }

    useEffect(() => {
        handleScrollToTop();
    }, [location.pathname])

    return (
        <>{props.children}</>
    )
}

export default PrivateRoute