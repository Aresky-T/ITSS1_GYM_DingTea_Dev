import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

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
        if(user.status !== "active"){
            Swal.fire({
                icon: "warning",
                title: "Waring",
                text: "Your account has not been activated. Please wait for confirmation from admin!",
                showConfirmButton: true,
                confirmButtonText: "Home",
                showCancelButton: false
            }).then(res => {
                if(res.isConfirmed){
                    navigate("/")
                }
            })
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        handleScrollToTop();
    }, [location.pathname])

    return (
        <>{props.children}</>
    )
}

export default PrivateRoute