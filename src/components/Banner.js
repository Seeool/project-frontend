import React from 'react';
import {Link, useLocation} from "react-router-dom";

function Banner(props) {
    const location = useLocation()
    let name = ""
    let display = ""
    switch(location.pathname) {
        case "/" :
            display = {display : 'none'}
            break
        case "/shop-grid" :
            name = '쇼핑'
            display = {display : 'block'}
            break
        case "/blog" :
            name = '블로그'
            display = {display : 'block'}
            break
        case "/contact" :
            name = 'Contact'
            display = {display : 'block'}
            break
        case "/shop-details" :
            name = '제품 상세'
            display = {display : 'block'}
            break
        case "/shopping-cart" :
            name = '쇼핑 카트'
            display = {display : 'block'}
            break
        case "/blog-details" :
            name = '블로그'
            display = {display : 'none'}
            break
    }
    return (
        <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg" style={display}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>{name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;