import React from 'react'
import Navbar from '../components/Navbar';

const NavbarContainer = () => {

    const [isShowPopup, setShowPopup] = React.useState(false);

    function handleChangePopupStatus() {
        setShowPopup(!isShowPopup);
    }

    return (
        <>
            <Navbar
                isShowPopup={isShowPopup}
                handleChangePopupStatus={handleChangePopupStatus}
            />
        </>
    )
}

export default NavbarContainer