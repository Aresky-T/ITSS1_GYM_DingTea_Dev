import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { SearchPopup } from "./SearchPopup";

const initialFilterOptions = [
    {
        id: 1,
        name: "option 1",
        data: "option 1",
        selected: false
    },
    {
        id: 2,
        name: "option 2",
        data: "option 2",
        selected: false
    },
    {
        id: 3,
        name: "option 3",
        data: "option 3",
        selected: false
    }
]

const Navbar = ({ links, isShowPopup, handleChangePopupStatus }) => {

    const [filterOptions, setFilterOptions] = useState(initialFilterOptions)

    const location = useLocation();

    const renderLinks = [...links].map(link => (
        <Link to={link.path}
            key={link.title}
            className={location.pathname === link.path ? "active" : ""}
        >
            {link.title}
        </Link>
    ))

    function changeOptionSelected (optionId) {
        const result = initialFilterOptions.map(option => {
            if(option.id === optionId){
                option.selected === true ? option.selected = false : option.selected = true
            }
            return option;
        })
        setFilterOptions(result);
    }

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
                <SearchPopup
                    isShowPopup={isShowPopup}
                    handleChangePopupStatus={handleChangePopupStatus}
                    filterOptions={filterOptions}
                    changeOptionSelected={changeOptionSelected}
                />}
        </div>
    )
}

export default Navbar