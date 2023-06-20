import {APP_ROUTE} from "./routes";

export const menu1 = [
    {
        title: "Login",
        path: APP_ROUTE.LOGIN,
        isPublic: true
    }
];

export const menu2 = [
    {
        title: "Create post",
        path: APP_ROUTE.CREATE_POST,
        isPublic: false
    }
]