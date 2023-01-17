import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import HeroCatogories from "./HeroCategories";
import {FormSelect} from "react-bootstrap";


const StyledLink = styled(Link)`
  text-decoration: none;
`
const StyledSelect = styled("select")`
  width: 100%;
  height: 48px;
`
const HeroSection = (props) => {
    const location = useLocation()
    let appendclass = "";
    if(location.pathname !== '/') {
        appendclass = 'hero-normal'
    }

    const [word, setWord] = useState('');
    const [type, setType] = useState('')
    const handleWord = (e) => {
        setWord(e.target.value)
    }
    const handleType = (e) => {
        setType(e.target.value)
    }

    const navigate = useNavigate()
    const search = (e) => {
        e.preventDefault()
        navigate("/shop-grid?type="+type+"&word="+word)
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
                                    <form action="/shop-grid" method={"get"}>
                                        <div className={"hero__search__categories"}>
                                            <StyledSelect className="form-control" onChange={handleType}>
                                                <option value={"all"}>All Categories</option>
                                                <option value={"meat"}>Fresh-Meat</option>
                                            </StyledSelect>
                                        </div>
                                        <input type="text" placeholder="제품 검색" value={word} onChange={handleWord}/>
                                        <button type="button" className="site-btn" onClick={search}>검색</button>
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
                            <br />
                            <br />
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
