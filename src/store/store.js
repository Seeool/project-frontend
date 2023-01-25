import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";

const reducers = combineReducers({
    cart : cartSlice.reducer, //이 이름이 실제로 컴포넌트에서 쓸 이름
    login : loginSlice.reducer
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
// const store = configureStore({
//     reducer: {
//         cart : persistedReducer,
//         login : loginSlice.reducer
//     },
//     middleware: getDefaultMiddleware({
//         serializableCheck: false,
//     })
// })

// const store = configureStore({
//     reducer: {
//         cart : cartSlice
//     }
// })

export default store;