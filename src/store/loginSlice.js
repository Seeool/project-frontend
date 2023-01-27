import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
    showLoginModal : false,
    isLogin : false,
    accessToken : undefined,
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setLoginShow : (state, action) => ({
            showLoginModal : action.payload,
        }),
        setLogin : (state, action) => ({
            ...state,
            showLoginModal : false,
            isLogin: true,
            accessToken: action.payload
        }),


        setLogout : () => initialState,

    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }

})
export const {setLoginShow, setLogin, setAccount, setLogout} = loginSlice.actions;
export default loginSlice;
