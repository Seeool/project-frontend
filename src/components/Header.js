import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, CloseButton, Form, Modal, Row} from "react-bootstrap";
import CartModal from "./ShoppingCart/CartModal";
import LoginModal from "./LoginModal/LoginModal";
import {setLoginShow} from "../store/loginSlice";
import JoinModal from "./LoginModal/JoinModal";

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
    const {cart} = useSelector(store => store.cart)
    let sum = 0
    cart.forEach((product) => {
        sum += product.qty
    })

    const dispatch = useDispatch()


    return (
        <>
            {/*<div id="preloder">*/}
            {/*    <div className="loader"></div>*/}
            {/*</div>*/}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li><i className="fa fa-envelope"/> Admin@email.com</li>
                                        <li>~~~님 즐거운 쇼핑 되세요</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__auth">
                                        <a href="#" onClick={() => dispatch(setLoginShow(true))}><i className="fa fa-user"/> 로그인</a>
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
        </>
    );
};

export default Header;
