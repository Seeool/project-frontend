import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import Product from "./Product";
const StyledLink = styled(Link)`
  text-decoration: none;
`
function ShopSideBar(props) {
    const products = [
        {
            id : 1,
            title : '테스트1',
            price : '$30',
            picUrl : 'img/02.jpg'
        },
        {
            id : 2,
            title : '테스트2',
            price : '$30',
            picUrl : 'img/latest-product/lp-2.jpg'
        },
        {
            id : 3,
            title : '테스트3',
            price : '$30',
            picUrl : 'img/latest-product/lp-3.jpg'
        },
        {
            id : 4,
            title : '테스트4',
            price : '$30',
            picUrl : 'img/latest-product/lp-2.jpg'
        },
        {
            id : 5,
            title : '테스트5',
            price : '$30',
            picUrl : 'img/latest-product/lp-3.jpg'
        },
        {
            id : 6,
            title : '테스트6',
            price : '$30',
            picUrl : 'img/latest-product/lp-1.jpg'
        }
    ]
    return (
        <div className="col-lg-3 col-md-5">
            <div className="sidebar">
                <div className="sidebar__item">
                    <h4>카테고리</h4>
                    <ul>
                        <li><StyledLink to="/shop-grid">전체</StyledLink></li>
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
                <div className="sidebar__item">
                    <div className="latest-product__text">
                        <h4>신상품</h4>
                        <div className="latest-product__slider owl-carousel">
                            <div className="latest-prdouct__slider__item">
                                {products.map((product, index) => {
                                    if(index < 3)
                                        return(<Product key={product.id} product={product}/> )
                                })}
                            </div>
                            <div className="latest-prdouct__slider__item">
                                {products.map((product, index) => {
                                    if(index > 2)
                                        return(<Product key={product.id} product={product}/> )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopSideBar;