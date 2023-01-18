import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";

const reducers = combineReducers({
    cart : cartSlice.reducer
})

const persistConfig = {
    key : 'cart',
    storage
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
//         cart : cartSlice
//     }
// })

export default store;