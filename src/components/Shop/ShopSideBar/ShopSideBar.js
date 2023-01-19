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
    console.log(params)
    const refs = Array.from({ length: 12 }).map(() => createRef());
    let categoryName = params.get('category')
    const categories = ['','과일','정육/계란','밀키트','냉장/냉동/간편식','통조림/즉석밥/면','쌀/잡곡','베이커리','장/양념/소스','우유/유제품','채소','건강식품']

    useEffect(() => {
        if(!categoryName) {
            refs.map((ref) => {
                ref.current.style.backgroundColor = 'white'
                ref.current.style.color = 'black'
            })
            refs[0].current.style.backgroundColor = '#7fad39'
            refs[0].current.style.color = 'white'
        }
        for (let i = 1; i < 12; i++) {
            if(parseInt(categoryName) === i) {
                refs.map((ref) => {
                    ref.current.style.transition = '0.2s'
                    ref.current.style.backgroundColor = 'white'
                    ref.current.style.color = 'black'
                })
                refs[i].current.style.transition = '0.2s'
                refs[i].current.style.backgroundColor = '#7fad39'
                refs[i].current.style.color = 'white'
            }
        }
    },[params])

    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/latestList")
            setProducts(response.data)
            console.log(response.data)
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
                        <li><StyledLink to="/shop-grid" ref={refs[0]}>전체</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=1" ref={refs[1]}>과일</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=2" ref={refs[2]}>정육/계란</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=3" ref={refs[3]}>밀키트</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=4" ref={refs[4]}>냉장/냉동/간편식</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=5" ref={refs[5]}>통조림/즉석밥/면</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=6" ref={refs[6]}>쌀/잡곡</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=7" ref={refs[7]}>베이커리</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=8" ref={refs[8]}>장/양념/소스</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=9" ref={refs[9]}>우유/유제품</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=10" ref={refs[10]}>채소</StyledLink></li>
                        <li><StyledLink to="/shop-grid?category=11" ref={refs[11]}>건강식품</StyledLink></li>
                    </ul>
                </div>
                <div className="sidebar__item">
                    <div className="latest-product__text">
                        <h4>신상품</h4>
                        <ReactOwlCarousel className={"latest-product__slider owl-carousel"} margin={0} items={1} nav={true} smartSpeed={1200}>
                        {/*<div className="latest-product__slider owl-carousel">*/}
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
                        {/*</div>*/}
                        </ReactOwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopSideBar;