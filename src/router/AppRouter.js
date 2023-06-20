import {routes} from "./routes";
import {useRoutes} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";

const AppRouter = () => {
    const user = useSelector(authSelector);

    return useRoutes(routes.filter(route => {
        if (route.is404) {
            return true;
        }

        if (route.isPrivate && user) {
            return !!(route.roles.includes(user.type));
        }

        return !route.isPrivate;
    }));
}

export default AppRouter