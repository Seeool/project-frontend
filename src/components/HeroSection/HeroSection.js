import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import $ from 'jquery'
import HeroCatogories from "./HeroCategories";
import app from "../../App";

const StyledLink = styled(Link)`
  text-decoration: none;
`
const HeroSection = (props) => {
    const location = useLocation()
    let appendclass = "";
    if(location.pathname !== '/') {
        appendclass = 'hero-normal'
    }

    return (
        <>
            <section className={"hero "+appendclass}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <HeroCatogories/>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="src/components#">
                                        <div className="hero__search__categories">
                                            All Categories
                                            <span className="arrow_carrot-down"></span>
                                        </div>
                                        <input type="text" placeholder="What do yo u need?"/>
                                        <button type="submit" className="site-btn">SEARCH</button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>070-1234-1234</h5>
                                        <span>연중무휴 문의상담</span>
                                    </div>
                                </div>
                            </div>
                            {location.pathname === '/' ?
                                <div className="hero__item set-bg" data-setbg="img/hero/banner.jpg">
                                <div className="hero__text">
                                    <span>FRUIT FRESH</span>
                                    <h2>Vegetable <br/>100% Organic</h2>
                                    <p>Free Pickup and Delivery Available</p>
                                    <StyledLink to="#" className="primary-btn">SHOP NOW</StyledLink>
                                </div>
                            </div> : ``}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
