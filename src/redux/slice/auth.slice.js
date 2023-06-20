import { createSlice } from "@reduxjs/toolkit";
import { customLocalStorage, removeLocalStorage } from "../../config/localStorageConfig";

const userInfo = JSON.parse(localStorage.getItem('user_info'));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            data: userInfo?.data || null
        }
    },
    reducers: {
        addUserInfo: (state, action) => {
            customLocalStorage('user_info').setProperty('data', action.payload);
            state.user.data = action.payload;
        },
        logout: (state) => {
            removeLocalStorage('user_info');
            state.user.data = null;
        }
    }
})

export const {addUserInfo, logout} = authSlice.actions;
export default authSlice.reducer;