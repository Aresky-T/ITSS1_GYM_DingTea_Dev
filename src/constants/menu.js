import { ROLE } from "./role";
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
        isPublic: false,
        role: ROLE.GYM
    }
]

export const menu3 = [
    {
        title: "Post",
        path: APP_ROUTE.POST_MANAGER,
        isPublic: false
    },
    {
        title: "Account",
        path: APP_ROUTE.ACCOUNT_MANAGER,
        isPublic: false,
        role: ROLE.ADMIN
    }
]