import { ROLE } from "./role";
import { APP_ROUTE } from "./routes";

export const menu1 = [
  {
    title: "ログイン",
    path: APP_ROUTE.LOGIN,
    isPublic: true,
  },
  {
    title: "登録",
    path: APP_ROUTE.REGISTER,
    isPublic: true,
  },
];

export const menu2 = [
  {
    title: "投稿を作成",
    path: APP_ROUTE.CREATE_POST,
    isPublic: false,
    role: ROLE.GYM,
  },
];

export const menu3 = [
  {
    title: "投稿",
    path: APP_ROUTE.POST_MANAGER,
    isPublic: false,
  },
  {
    title: "アカウント",
    path: APP_ROUTE.ACCOUNT_MANAGER,
    isPublic: false,
    role: ROLE.ADMIN,
  },
];
