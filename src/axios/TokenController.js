import axios from "axios";
import {setLogin} from "../store/loginSlice";
import {setAccount} from "../store/userSlice";
import {useDispatch} from "react-redux";

const dispatch = useDispatch()

const login = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.post("http://localhost:9000/loginProc", loginInfo)
    const accessToken = response.data.accessToken;
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
    dispatch(setLogin(accessToken))

    const account = await axios.get("http://localhost:9000/api/member/me", {headers: {Authorization: "Bearer " + accessToken}})
    dispatch(setAccount(account.data))

}