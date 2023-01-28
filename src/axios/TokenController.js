import React from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {setLogin} from "../store/loginSlice";
import {setAccount} from "../store/userSlice";

const TokenController = () => {
    const dispatch = useDispatch();

    const getNewToken = async () => {
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



    return (
        <div>

        </div>
    );
};

export default TokenController;
