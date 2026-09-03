import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "../Features/userSlice"
import { persistReducer, persistStore } from "redux-persist"

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
}

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(Store)
export default Store