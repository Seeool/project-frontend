import React from 'react';
import axios from "axios";
import {setLogin} from "../store/loginSlice";
import {setAccount} from "../store/userSlice";
import {useDispatch} from "react-redux";

export const getNewToken = async () => {
    const dispatch = useDispatch()
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
        const accessToken = response.data.accessToken;
        axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
        dispatch(setLogin(accessToken))

        const account = await axios.get("http://localhost:9000/api/member/me", )
        dispatch(setAccount(account.data))
    }
    catch (e) {
        console.log(e)
    }
}

export default getNewToken;
