import React from 'react'
import { APP_ROUTE } from "../constants/routes"
import Navbar from '../components/Navbar';

const NavbarContainer = () => {

    const [isShowPopup, setShowPopup] = React.useState(false);

    const links = [
        {
            title: "Home",
            path: APP_ROUTE.HOME,
        }, {
            title: "Login",
            path: APP_ROUTE.LOGIN,
        },
    ];

    function handleChangePopupStatus() {
        setShowPopup(isShowPopup ? false : true);
    }


    return (
        <>
            <Navbar
                links={links}
                isShowPopup={isShowPopup}
                handleChangePopupStatus={handleChangePopupStatus}
            />
        </>
    )
}

export default NavbarContainer