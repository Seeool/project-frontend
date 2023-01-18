import React, {useEffect, useRef, useState} from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../store/cartSlice";
import appendScript from "../../../appendScript";


const FeaturedProduct = (props) => {
    const [cookies, setCookie] = useCookies(['cart'])

    const {pid, category, name, price} = props.product
    const handleShow = props.handleShow

    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        handleShow()
        dispatch(addProduct({id : pid, name : name, price : price}))
    }
    return (
        <>
            <div className={category + " col-lg-2 col-md-4 col-sm-6 mix"}>
                <div className="featured__item">
                    <div
                        className="featured__item__pic set-bg"
                        data-setbg={'./img/02.jpg'}
                    >
                        <ul className="featured__item__pic__hover">
                            <li>
                                <Link className="addCartBtn" onClick={addToCart}>
                                    <i className="fa fa-shopping-cart"></i>
                                    <input type={'hidden'} value={name}/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="featured__item__text">
                        <h6><Link to={`/shop-details?pid=${pid}`}>{name}</Link></h6>
                        <h5>\{price}</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedProduct;
