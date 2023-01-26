import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showJoinModal : false,
}

const joinSlice = createSlice({
    name : 'join',
    initialState,
    reducers : {
        setJoinShow : (state, action) => ({
            showJoinModal : action.payload
        })

    }

})
export const {setJoinShow} = joinSlice.actions;
export default joinSlice;
