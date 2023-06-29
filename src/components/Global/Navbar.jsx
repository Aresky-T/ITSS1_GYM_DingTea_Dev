import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import FilterContainer from '../../containers/global/FilterContainer';
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { menu1, menu2, menu3 } from "../../constants/menu";
import { logout } from "../../redux/slice/auth.slice";
import { ROLE } from '../../constants/role';

const Navbar = ({ isShowPopup, handleChangePopupStatus }) => {

    const user = useSelector(authSelector);
    const location = useLocation();
    const [dataShow, setDataShow] = useState({
        renderLinks: [],
        isShowSearchBar: false,
    })
    const [isShowLogout, setIsShowLogout] = useState(false);
    const userRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeIsShowLogout = () => {
        setIsShowLogout(!isShowLogout);
    }

    useEffect(() => {
        if (user && user.type === ROLE.GYM) {
            setDataShow({
                ...dataShow,
                isShowSearchBar: true,
                renderLinks: menu2,
            })
        } else if (user && user.type === ROLE.ADMIN) {
            setDataShow({
                ...dataShow,
                isShowSearchBar: false,
                renderLinks: menu3,
            })
        } else {
            setDataShow({
                ...dataShow,
                isShowSearchBar: true,
                renderLinks: menu1,
            })
        }
        //eslint-disable-next-line
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
                {dataShow.isShowSearchBar && <div className="search-bar"
                    onClick={handleChangePopupStatus}
                >
                    <span className="search-placeholder">Search here...</span>
                    <span className="search-icon"><CiSearch /></span>
                </div>}
                <div className="nav-links">
                    <div className="nav-links-main">
                        {dataShow.renderLinks.map(link => (
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