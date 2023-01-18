import React, {createRef, useEffect, useRef} from 'react';
import styled from "styled-components";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import Product from "./Product";
import $ from 'jquery'

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 10px;
`
function ShopSideBar(props) {
    const params = new URLSearchParams(useLocation().search)
    console.log(params)
    const refs = Array.from({ length: 12 }).map(() => createRef());
    let categoryName = params.get('category')
    const categories = ['','fruits','freshmeat','mealkit','instance','bean','rice','bakery','source','milk','vegetables','wellbeing']

    useEffect(() => {
        console.log(categoryName)
        if(!categoryName) {
            refs.map((ref) => {
                ref.current.style.backgroundColor = 'white'
                ref.current.style.color = 'black'
            })
            refs[0].current.style.backgroundColor = '#7fad39'
            refs[0].current.style.color = 'white'
        }
        for (let i = 1; i < 12; i++) {
            if(categoryName === categories[i]) {
                refs.map((ref) => {
                    ref.current.style.backgroundColor = 'white'
                    ref.current.style.color = 'black'
                })
                refs[i].current.style.backgroundColor = '#7fad39'
                refs[i].current.style.color = 'white'
            }
        }
    },[params])

    const [serchParams, setSearchParams] = useSearchParams();
    console.log(serchParams.toString())
    console.log(serchParams.get('category'))

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
                    <ul className="sidebar__categories">
                        <li><StyledLink to="/shop-grid" ref={refs[0]}>전체</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=fruits" ref={refs[1]}>과일</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=freshmeat" ref={refs[2]}>정육/계란</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=mealkit" ref={refs[3]}>밀키트</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=instance" ref={refs[4]}>냉장/냉동/간편식</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=bean" ref={refs[5]}>통조림/즉석밥/면</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=rice" ref={refs[6]}>쌀/잡곡</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=bakery" ref={refs[7]}>베이커리</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=source" ref={refs[8]}>장/양념/소스</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=milk" ref={refs[9]}>우유/유제품</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=vegetables" ref={refs[10]}>채소</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=wellbeing" ref={refs[11]}>건강식품</StyledLink></li>
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