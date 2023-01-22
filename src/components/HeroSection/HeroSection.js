import React, {useEffect, useRef, useState} from 'react';
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

    const [keyword, setKetword] = useState('');
    const [category, setCategory] = useState('')
    const handleWord = (e) => {
        setKetword(e.target.value)
    }
    const handleType = (e) => {
        setCategory(e.target.value)
    }
    const navigate = useNavigate()
    const enterPress = e => {
        if (e.key === 'Enter') {
            navigate("/shop-grid?category="+category+"&keyword="+keyword)
        }
    };
    const search = (e) => {
        e.preventDefault()
        navigate("/shop-grid?category="+category+"&keyword="+keyword)
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

                                        <div className={"hero__search__categories"}>
                                            <StyledSelect className="form-control" onChange={handleType}>
                                                <option value={""}>전체</option>
                                                <option value={"0"}>과일</option>
                                                <option value={"1"}>정육/계란</option>
                                                <option value={"2"}>밀키트</option>
                                                <option value={"3"}>냉장/냉동/간편식</option>
                                                <option value={"4"}>통조림/즉석밥/면</option>
                                                <option value={"5"}>쌀/잡곡</option>
                                                <option value={"6"}>베이커리</option>
                                                <option value={"7"}>장/양념/소스</option>
                                                <option value={"8"}>우유/유제품</option>
                                                <option value={"9"}>채소</option>
                                                <option value={"10"}>건강식품</option>
                                            </StyledSelect>
                                        </div>
                                        <input type="text" placeholder="제품 검색" value={keyword} onChange={handleWord} onKeyDown={enterPress}/>
                                        <button type="button" className="site-btn" onClick={search}>검색</button>

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
                                <div className="hero__item set-bg" style={{backgroundImage : 'url("img/hero/banner.jpg")'}} >
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
