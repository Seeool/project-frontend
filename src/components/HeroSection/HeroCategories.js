import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import $ from 'jquery'

const StyledLink = styled(Link)`
  text-decoration: none;
`
const HeroCategories = () => {
    const location = useLocation()
    if(location.pathname !== '/') {
        $('.hero__categories ul').hide()
    }else {
        $('.hero__categories ul').show()
    }
    useEffect(() => { //렌더될때마다 새롭게 온클릭 이벤트를 할당시켜줘야해서???
        $('.hero__categories__all').on('click', function () {
            $('.hero__categories ul').slideToggle(400);
        });
    },[])
    return (
        <div className="hero__categories">
            <div className="hero__categories__all">
                <i className="fa fa-bars"></i>
                <span>카테고리</span>
            </div>
            <ul>
                <li><StyledLink to="/shop-grid?category=fruits">과일</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=freshmeat">정육/계란</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=mealkit">밀키트</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=instance">냉장/냉동/간편식</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=bean">통조림/즉석밥/면</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=rice">쌀/잡곡</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=bakery">베이커리</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=source">장/양념/소스</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=milk">우유/유제품</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=vegetables">채소</StyledLink></li>
                <li><StyledLink to="/shop-grid?category=wellbeing">건강식품</StyledLink></li>
            </ul>
        </div>
    );
};

export default HeroCategories;
