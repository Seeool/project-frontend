import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import joinSlice from "./joinSlice";
import userSlice from "./userSlice";

const cartPersistConfig = {
    key : 'cart',
    storage : storage,
}
const loginPersistConfig = {
    key : 'login',
    storage : sessionStorage
}
const userPersistConfig = {
    key : 'user',
    storage : sessionStorage
}

const rootReducers = combineReducers({
    cart : persistReducer(cartPersistConfig, cartSlice.reducer), //이 이름이 실제로 컴포넌트에서 쓸 이름
    login : persistReducer(loginPersistConfig, loginSlice.reducer),
    user : persistReducer(userPersistConfig, userSlice.reducer),
    join : joinSlice.reducer
})

const store = configureStore({
    reducer : rootReducers,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store;