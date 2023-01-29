import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import CartModal from "./ShoppingCart/CartModal";
import LoginModal from "./LoginModal/LoginModal";
import {setIsLogin, setLogin, setLoginShow, setLogout} from "../store/loginSlice";
import JoinModal from "./LoginModal/JoinModal";
import axios, {get} from "axios";
import {persistor} from "../index";
import {setAccount} from "../store/userSlice";
import PreLoader from "./PreLoader/PreLoader";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: red;
`

const active = {
    color: '#7fad39',
    textDecoration: 'none'
}
const inactive = {
    color: 'black',
    textDecoration: 'none'
}
const Header = () => {
    const [isLoading, setIsLoading] = useState(false);
    console.log("헤더 랜더링")
    const {cart} = useSelector(store => store.cart)
    let sum = 0
    cart.forEach((product) => {
        sum += product.qty
    })
    const isLogin = useSelector(store => store.login.isLogin)
    const name = useSelector(store => store.user.name)
    const fileName = useSelector(store => store.user.fileName)
    const accessToken = useSelector(store => store.login.accessToken)
    const userRole = useSelector(store => store.user.userRole)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const purge = async () => {
        await persistor.purge();
    }

    const getNewToken = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
            const accessToken = response.data.accessToken;
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
            dispatch(setLogin(accessToken))

            const account = await axios.get("http://localhost:9000/api/member/me",)
            dispatch(setAccount(account.data))
        } catch (e) {
            console.log(e)
            if (e.response.data.msg === "NO_REFRESH") {
                purge()
            }
        }
    }
    const showLoginModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(setLoginShow(true))
    }
    const logout = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            console.log("로그아웃실행")
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:9000/logoutProc")
            axios.defaults.headers.common["Authorization"] = ""
            purge()
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNewToken()
    }, [])


    return (
        <>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li>문의 : <i className="fa fa-envelope"/> Admin@email.com</li>
                                        {isLogin
                                            ? <li>{name}님 환영합니다 ({userRole})</li>
                                            : ''}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__auth">
                                        {isLogin
                                            ? <a href="/" onClick={logout}><i className="fa fa-user"/> 로그아웃</a>
                                            : <a href="/" onClick={showLoginModal}><i className="fa fa-user"/> 로그인</a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <StyledLink to="./"><img src="img/logo.png" alt=""/></StyledLink>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li><NavLink to="./"
                                                 style={({isActive}) => isActive ? active : inactive}>홈</NavLink></li>
                                    <li><NavLink to="./shop-grid"
                                                 style={({isActive}) => isActive ? active : inactive}>쇼핑</NavLink></li>
                                    <li><NavLink to="./blog"
                                                 style={({isActive}) => isActive ? active : inactive}>블로그</NavLink></li>
                                    <li><NavLink to="./contact"
                                                 style={({isActive}) => isActive ? active : inactive}>Contact</NavLink>
                                    </li>
                                    {userRole === "ADMIN" || userRole === "MANAGER"
                                        ? <li>
                                            <StyledLink to="#"><span
                                                style={{color: 'red'}}>관리자 전용 메뉴</span></StyledLink>
                                            <ul className="header__menu__dropdown">
                                                <li><StyledLink to="./shop-details-create">상품 등록</StyledLink></li>
                                                <li><StyledLink to="./blog-details-create">블로그 등록</StyledLink></li>
                                                <li><StyledLink to="#">회원 관리 (준비중)</StyledLink></li>
                                            </ul>
                                        </li>
                                        : ''
                                    }

                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li>
                                        <span>장바구니 </span><StyledLink to="/shopping-cart"><i
                                        className="fa fa-shopping-bag"/> <span>{sum}</span></StyledLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <LoginModal/>
            <JoinModal/>
            <CartModal/>
            {isLoading ? <PreLoader/> : ''}
        </>
    );
};

export default Header;
