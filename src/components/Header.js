import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
import cartReducer from "../store/cartSlice";

const StyledLink = styled(Link)`
  text-decoration: none;
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
    console.log("Header 렌더링됨")
    const [cookies, setCookie] = useCookies(['cart'])

    // let amount = []
    // if (cookies.cart !== undefined) {
    //     amount = cookies.cart.split('/')
    // }
    // const set = new Set(amount)

    const {cart} = useSelector(store => store)
    console.log(cart)
    let sum = 0
    cart.cart.forEach((product) => {
        sum += product.qty
    })
    return (
        <>
        <div id="preloder">
            <div className="loader"></div>
        </div>
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope" /> Admin@email.com</li>
                                    <li>~~~님 즐거운 쇼핑 되세요</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                <div className="header__top__right__auth">
                                    <StyledLink to="#"><i className="fa fa-user" /> 로그인</StyledLink>
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
                            <StyledLink to="./"><img src="img/logo.png" alt="" /></StyledLink>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li><NavLink to="./" style={({isActive}) => isActive ? active : inactive}>홈</NavLink></li>
                                <li><NavLink to="./shop-grid" style={({isActive}) => isActive ? active : inactive}>쇼핑</NavLink></li>
                                <li><NavLink to="./blog" style={({isActive}) => isActive ? active : inactive}>블로그</NavLink></li>
                                <li><NavLink to="./contact" style={({isActive}) => isActive ? active : inactive}>Contact</NavLink></li>
                                <li>
                                    <StyledLink to="#">Pages</StyledLink>
                                    <ul className="header__menu__dropdown">
                                        <li><StyledLink to="./shop-details">Shop Details</StyledLink></li>
                                        <li><StyledLink to="./shopping-cart">Shopping Cart</StyledLink></li>
                                        <li><StyledLink to="./blog-details">Blog Details</StyledLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li>
                                    <span>장바구니 </span><StyledLink to="/shopping-cart"><i className="fa fa-shopping-bag" /> <span>{sum}</span></StyledLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;
