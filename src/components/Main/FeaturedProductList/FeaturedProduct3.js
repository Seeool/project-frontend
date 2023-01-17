import React, {useEffect, useRef, useState} from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const FeaturedProduct = (props) => {

    const {id, type, name, price, picUrl} = props.product
    const handleShow = props.handleShow

    const [cookies, setCookie] = useCookies(['cart'])
    const addToCart = (e) => {
        e.preventDefault()
        handleShow()
        if(cookies.cart !== undefined) {
            setCookie('cart', cookies.cart + '/' + id)
        }
        else {
            setCookie('cart', id)
        }

    }
    return (
        <>
            <div className={type + " col-lg-3 col-md-4 col-sm-6 mix"}>
                <div className="featured__item">
                    <div
                        className="featured__item__pic set-bg"
                        data-setbg={picUrl}
                    >
                        <ul className="featured__item__pic__hover">
                            <li>
                                <a className="addCartBtn" href="src/components#" onClick={addToCart}>
                                    <i className="fa fa-shopping-cart"></i>
                                    <input type={'hidden'} value={name}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="featured__item__text">
                        <h6><Link to={`/shop-details/${id}`}>{name}</Link></h6>
                        <h5>{price}</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedProduct;
