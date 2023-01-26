import React from 'react';
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showLoginModal : false,
    isLogin : false,
    loginStep : 1,
    mid : undefined,
    fileName : undefined,
    accessToken : undefined
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setLoginShow : (state, action) => ({
            showLoginModal : action.payload,
        }),

        loginNextStep : (state, action) => ({
            loginStep : state.loginStep + 1
        }),

        loginPrevStep : (state, action) => ({
            loginStep : state.loginStep - 1
        }),

        loginResetStep : () => initialState,

        setAccessToken : (state, action) => ({
            accessToken : action.payload
        }),

        setSignup : (state, {payload : {key, value}}) => ({
            ...state, [key]:value
        })
    }

})
export const {setLoginShow, loginNextStep, loginPrevStep, loginResetStep, setSignup, setAccessToken} = loginSlice.actions;
export default loginSlice;
