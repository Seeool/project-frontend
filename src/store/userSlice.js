import React from 'react';
import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
    mid : undefined,
    fileName : undefined,
    accessToken : undefined
}

const userSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setAccount : (state, action) => ({
            ...state,
            mid : action.payload.mid,
            name : action.payload.name,
            fileName: action.payload.fileName
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }

})
export const {setAccount} = userSlice.actions;
export default userSlice;
