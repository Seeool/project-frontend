import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import cartSlice from "./cartSlice";

const reducers = combineReducers({
    cart : cartSlice.reducer //이 이름이 실제로 컴포넌트에서 쓸 이름
})

const persistConfig = {
    key : 'keyName',
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