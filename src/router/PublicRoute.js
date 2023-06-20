import React, {useEffect} from 'react'
import {handleScrollToTop} from "./PrivateRoute";
import {useLocation} from "react-router-dom";

const PublicRoute = (props) => {
    const location = useLocation();

    useEffect(() => {
        handleScrollToTop();
    }, [location.pathname])
    return (
        <>{props.children}</>
    )
}

export default PublicRoute