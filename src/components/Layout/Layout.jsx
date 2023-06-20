import NavbarContainer from "../../containers/NavbarContainer";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="container main">
            <NavbarContainer/>
            <Outlet/>
        </div>
    )
}
export default Layout;