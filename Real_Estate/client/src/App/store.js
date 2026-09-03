import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../Features/userSlice"
const Store=configureStore({
    reducer:{user:userReducer},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })


})
export default Store