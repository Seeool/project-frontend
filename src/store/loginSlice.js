import React from 'react';
import {createSlice} from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const initialState = {
    loginModalShow : false,
    loginStep : 1,
    mid : undefined,
    fileName : undefined,
    accessToken : undefined
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setLoginModalShow : (state, action) => ({
            loginModalShow : action.payload
        }),

        loginNextStep : (state, action) => ({
            loginStep : state.loginStep + 1
        }),

        loginPrevStep : (state, action) => ({
            loginStep : state.loginStep - 1
        }),

        loginResetStep : () => initialState,

        setSignup : (state, {payload : {key, value}}) => ({
            ...state, [key]:value
        })
    }

})
export const {setLoginModalShow, loginNextStep, loginPrevStep, loginResetStep, setSignup} = loginSlice.actions;
export default loginSlice;
