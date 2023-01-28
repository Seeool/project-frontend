import React from 'react';
import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
    mid : undefined,
    name : undefined,
    fileName : undefined,
    roleSet : undefined,
    userRole : undefined
}

const userSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setAccount : (state, action) => {
            state.mid = action.payload.mid
            state.name = action.payload.name
            state.fileName = action.payload.fileName

            if (action.payload.roleSet.find(role => role === "ADMIN")) {state.userRole = "ADMIN"}
            else if (action.payload.roleSet.find(role => role === "MANAGER")) { state.userRole = "MANAGER"}
            else if (action.payload.roleSet.find(role => role === "USER")) { state.userRole = "USER"}
            state.roleSet = action.payload.roleSet
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }

})
export const {setAccount} = userSlice.actions;
export default userSlice;
