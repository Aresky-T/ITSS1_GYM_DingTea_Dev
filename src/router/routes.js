import { APP_ROUTE } from "../constants/routes";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import GymDetailsPage from "../pages/GymDetailsPage";
import CreatePostPage from "../pages/CreatePostPage";
import { ROLE } from "../constants/role";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout/Layout";

export const routes = [
    {
        path: APP_ROUTE.HOME,
        element: <Layout />,
        isPrivate: false,
        children: [
            { path: '', element: <HomePage /> },
            { path: APP_ROUTE.LOGIN, element: <LoginPage /> },
            { path: APP_ROUTE.REGISTER, element: <RegisterPage /> },
            { path: APP_ROUTE.POST_DETAILS, element: <PostDetailsPage /> },
            { path: APP_ROUTE.GYM_DETAILS, element: <GymDetailsPage /> },
        ]
    },
    {
        path: APP_ROUTE.HOME,
        element: <Layout />,
        isPrivate: true,
        roles: [ROLE.GYM],
        children: [
            { path: APP_ROUTE.CREATE_POST, element: <CreatePostPage /> }
        ]
    },
    { path: '*', element: <NotFoundPage />, is404: true }
].map(route => {
    if (route.isPrivate) {
        return {
            ...route,
            element: (
                <PrivateRoute>{route.element}</PrivateRoute>
            )
        }
    }
    return {
        ...route,
        element: (
            <PublicRoute>{route.element}</PublicRoute>
        )
    }
})