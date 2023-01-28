import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import $ from 'jquery'

function Banner(props) {
    const location = useLocation()
    const ref = useRef(null)
    const [name, setName] = useState('')
    useEffect(() => {
        switch(location.pathname) {
            case "/" :
                $('.breadcrumb-section').hide()
                break
            case "/shop-grid" :
                setName('쇼핑')
                $('.breadcrumb-section').show()
                break
            case "/blog" :
                setName('블로그')
                $('.breadcrumb-section').show()
                break
            case "/contact" :
                setName('Contact')
                $('.breadcrumb-section').show()
                break
            case "/shop-details" :
                setName('상품 상세')
                $('.breadcrumb-section').show()
                break
            case "/shop-details-modify" :
                setName('상품 수정')
                $('.breadcrumb-section').show()
                break
            case "/shop-details-create" :
                setName('상품 등록')
                $('.breadcrumb-section').show()
                break
            case "/shopping-cart" :
                setName('쇼핑 카트')
                $('.breadcrumb-section').show()
                break
            case "/blog-details" :
                setName('블로그')
                $('.breadcrumb-section').hide()
                break
        }
    },[location])

    return (
        <section className="breadcrumb-section set-bg" style={{backgroundImage : 'url("img/breadcrumb.jpg")', display : 'none'}} ref={ref}>
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