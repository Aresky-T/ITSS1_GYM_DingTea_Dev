import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import FilterContainer from '../containers/FilterContainer';

const Navbar = ({ links, isShowPopup, handleChangePopupStatus }) => {

    const location = useLocation();
    
    const renderLinks = [...links].map(link => (
        <Link to={link.path}
            key={link.title}
            className={location.pathname === link.path ? "active" : ""}
        >
            {link.title}
        </Link>
    ))

    return (
        <div className='navbar container'>
            <Link className="logo" to="/">Gym<span>Finder</span></Link>
            <div className="search-bar"
                onClick={handleChangePopupStatus}
            >
                <span className="search-placeholder">Search...</span>
                <span className="search-icon"><CiSearch /></span>
            </div>
            <div className="nav-links">
                <div className="nav-links-main">
                    {renderLinks}
                </div>
            </div>
            {isShowPopup &&
                <FilterContainer
                    handleChangePopupStatus={handleChangePopupStatus}
                />}
        </div>
    )
}

export default Navbar