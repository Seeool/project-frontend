import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import joinSlice from "./joinSlice";

const cartPersistConfig = {
    key : 'keyName',
    storage,
    whitelist : ['cart']
}

const persistedReducer = persistReducer(cartPersistConfig, cartSlice.reducer)

const reducers = combineReducers({
    // cart : cartSlice.reducer, //이 이름이 실제로 컴포넌트에서 쓸 이름
    cart : persistedReducer,
    login : loginSlice.reducer,
    join : joinSlice.reducer
})

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store;
import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import joinSlice from "./joinSlice";

const reducers = combineReducers({
    cart : cartSlice.reducer, //이 이름이 실제로 컴포넌트에서 쓸 이름
    login : loginSlice.reducer,
    join : joinSlice.reducer
})

const persistConfig = {
    key : 'keyName',
    storage,
    whitelist : ['cart']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store;