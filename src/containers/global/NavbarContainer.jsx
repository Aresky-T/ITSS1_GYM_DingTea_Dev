import React from 'react'
import Navbar from '../../components/Global/Navbar';

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