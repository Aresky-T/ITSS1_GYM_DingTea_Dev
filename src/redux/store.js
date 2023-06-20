import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../redux/slice/loading.slice"
import authReducer from "../redux/slice/auth.slice"

const rootReducer = {
    loading: loadingReducer,
    auth: authReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})


export default store;