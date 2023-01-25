import React, {createRef, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import Product from "./Product";
import $ from 'jquery'
import axios, {get} from "axios";
import ReactOwlCarousel from "react-owl-carousel";

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 10px;
`
function ShopSideBar(props) {
    const params = new URLSearchParams(useLocation().search)
    const refs = Array.from({ length: 12 }).map(() => createRef());
    let categoryName = params.get('category')

    useEffect(() => {
        refs.map(ref => {
            ref.current.classList.remove('active')
        })
        if(categoryName === null || categoryName === "") {
            refs[11]?.current.classList.add('active')
        }
        refs[categoryName]?.current.classList.add('active')
    }, [params])

    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/latestList")
            setProducts(response.data)
        }catch (e) {
            alert(e)
        }
    }
    useEffect(() => {
        getProducts()
    },[])

    const [carowsel, setCarowsel] = useState(false)
    useEffect(() => {
        setCarowsel(!carowsel)
    },[products])

    return (
        <div className="col-lg-3 col-md-5">
            <div className="sidebar">
                <div className="sidebar__item">
                    <h4>카테고리</h4>
                    <ul className="sidebar__categories">
                        <li ref={refs[11]}><StyledLink to="/shop-grid">전체</StyledLink></li>
                        <li ref={refs[0]}><StyledLink to="/shop-grid?category=0">과일</StyledLink></li>
                        <li ref={refs[1]}><StyledLink to="/shop-grid?category=1">정육/계란</StyledLink></li>
                        <li ref={refs[2]}><StyledLink to="/shop-grid?category=2">밀키트</StyledLink></li>
                        <li ref={refs[3]}><StyledLink to="/shop-grid?category=3">냉장/냉동/간편식</StyledLink></li>
                        <li ref={refs[4]}><StyledLink to="/shop-grid?category=4">통조림/즉석밥/면</StyledLink></li>
                        <li ref={refs[5]}><StyledLink to="/shop-grid?category=5">쌀/잡곡</StyledLink></li>
                        <li ref={refs[6]}><StyledLink to="/shop-grid?category=6">베이커리</StyledLink></li>
                        <li ref={refs[7]}><StyledLink to="/shop-grid?category=7">장/양념/소스</StyledLink></li>
                        <li ref={refs[8]}><StyledLink to="/shop-grid?category=8">우유/유제품</StyledLink></li>
                        <li ref={refs[9]}><StyledLink to="/shop-grid?category=9">채소</StyledLink></li>
                        <li ref={refs[10]}><StyledLink to="/shop-grid?category=10">건강식품</StyledLink></li>
                    </ul>
                </div>
                <div className="sidebar__item">
                    <div className="latest-product__text">
                        <h4>신상품</h4>
                        <ReactOwlCarousel className={"latest-product__slider owl-carousel"} margin={0} items={1} nav={true} smartSpeed={1200}>
                            <div className="latest-prdouct__slider__item">
                                {products.map((product, index) => {
                                    if(index < 3)
                                        return(<Product key={product.pid} product={product}/> )
                                })}
                            </div>
                            <div className="latest-prdouct__slider__item">
                                {products.map((product, index) => {
                                    if(index > 2)
                                        return(<Product key={product.pid} product={product}/> )
                                })}
                            </div>
                        </ReactOwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopSideBar;