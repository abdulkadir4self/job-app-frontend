import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import authSlice from "./authSlice";


const store = configureStore({
    reducer:{
        authSlice,
        jobSlice,
    }
})

export default store;
