import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menu1, menu2, menu3 } from "../../constants/menu";
import { ROLE } from "../../constants/role";
import FilterContainer from "../../containers/global/FilterContainer";
import { authSelector } from "../../redux/selector";
import { logout } from "../../redux/slice/auth.slice";

const Navbar = ({ isShowPopup, handleChangePopupStatus }) => {
  const user = useSelector(authSelector);
  const location = useLocation();
  const [dataShow, setDataShow] = useState({
    renderLinks: [],
    isShowSearchBar: false,
  });
  const [isShowLogout, setIsShowLogout] = useState(false);
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeIsShowLogout = () => {
    setIsShowLogout(!isShowLogout);
  };

  useEffect(() => {
    if (user && user.type === ROLE.GYM) {
      setDataShow({
        ...dataShow,
        isShowSearchBar: true,
        renderLinks: menu2,
      });
    } else if (user && user.type === ROLE.ADMIN) {
      setDataShow({
        ...dataShow,
        isShowSearchBar: false,
        renderLinks: menu3,
      });
    } else {
      setDataShow({
        ...dataShow,
        isShowSearchBar: true,
        renderLinks: menu1,
      });
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    let onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setIsShowLogout(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  });

  return (
    <div className="navbar container">
      {user?.type === "admin" ?
        <Link className="logo logo-admin" to="/">
          Gym<span>Finder</span> <span>for admin</span>
        </Link>
        :
        <Link className="logo" to="/">
          Gym<span>Finder</span>
        </Link>
      }
      <div className="navbar-main">
        {dataShow.isShowSearchBar && (
          <div className="search-bar" onClick={handleChangePopupStatus}>
            <span className="search-placeholder">検索 ...</span>
            <span className="search-icon">
              <CiSearch />
            </span>
          </div>
        )}
        <div className="nav-links">
          <div className="nav-links-main">
            {dataShow.renderLinks.map((link) => (
              <Link
                to={link.path}
                key={link.title}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        {user && (
          <div
            className="user-area"
            onClick={handleChangeIsShowLogout}
            ref={userRef}
          >
            <div className="gym-logo">
              <img src={user.logo} alt="" />
            </div>
            <div className="gym-name">{user.name}</div>
            {isShowLogout && (
              <div
                className="logout-btn"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                ログアウト
              </div>
            )}
          </div>
        )}
      </div>
      {isShowPopup && (
        <FilterContainer handleChangePopupStatus={handleChangePopupStatus} />
      )}
    </div>
  );
};

export default Navbar;
