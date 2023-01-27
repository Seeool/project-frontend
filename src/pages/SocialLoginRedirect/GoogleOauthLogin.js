import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setLogin} from "../../store/loginSlice";
import {setAccount} from "../../store/userSlice";
import {useDispatch} from "react-redux";
import PreLoader from "../../components/PreLoader/PreLoader";

const GoogleOauthLogin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code")
    const login = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:9000/login/oauth2/code/google?code=${code}`)
            const accessToken = response.data.accessToken;
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
            dispatch(setLogin(accessToken))

            const account = await axios.get("http://localhost:9000/api/member/me", {headers: {Authorization: "Bearer " + accessToken}})
            dispatch(setAccount(account.data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLoading(true)
        login()
    }, []);


    return (
        <PreLoader/>
    );
};

export default GoogleOauthLogin;
