import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import FilterContainer from '../containers/FilterContainer';
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/selector";
import { menu1, menu2 } from "../constants/menu";
import { logout } from "../redux/slice/auth.slice";

const Navbar = ({ isShowPopup, handleChangePopupStatus }) => {

    const user = useSelector(authSelector);
    const location = useLocation();
    const [renderLinks, setRenderLinks] = useState([]);
    const [isShowLogout, setIsShowLogout] = useState(false);
    const userRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeIsShowLogout = () => {
        setIsShowLogout(!isShowLogout);
    }

    useEffect(() => {
        if (user) {
            setRenderLinks(menu2);
        } else {
            setRenderLinks(menu1)
        }
    }, [user])

    useEffect(() => {
        let onClick = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setIsShowLogout(false);
            }
        }
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('mousedown', onClick);
        }
    })

    return (
        <div className='navbar container'>
            <Link className="logo" to="/">Gym<span>Finder</span></Link>
            <div className="navbar-main">
                <div className="search-bar"
                    onClick={handleChangePopupStatus}
                >
                    <span className="search-placeholder">Search here...</span>
                    <span className="search-icon"><CiSearch /></span>
                </div>
                <div className="nav-links">
                    <div className="nav-links-main">
                        {renderLinks.map(link => (
                            <Link to={link.path}
                                key={link.title}
                                className={location.pathname === link.path ? "active" : ""}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
                {user &&
                    <div className="user-area" onClick={handleChangeIsShowLogout}
                        ref={userRef}
                    >
                        <div className="gym-logo">
                            <img src={user.logo} alt='' />
                        </div>
                        <div className="gym-name">{user.name}</div>
                        {isShowLogout &&
                            <div className="logout-btn"
                                onClick={() => {
                                    dispatch(logout());
                                    navigate('/');
                                }}
                            >Logout</div>
                        }
                    </div>
                }
            </div>
            {isShowPopup &&
                <FilterContainer
                    handleChangePopupStatus={handleChangePopupStatus}
                />}
        </div>
    )
}

export default Navbar