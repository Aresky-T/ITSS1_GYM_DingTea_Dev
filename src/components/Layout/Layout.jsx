import NavbarContainer from "../../containers/global/NavbarContainer";
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