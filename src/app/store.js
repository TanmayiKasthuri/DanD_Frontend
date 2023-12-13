import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice"

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware),
    //devTools:'True'//to add redux devtools integration
    devTools:false//for deployment
})

setupListeners(store.dispatch)//for multiple people opening at the same time and updating