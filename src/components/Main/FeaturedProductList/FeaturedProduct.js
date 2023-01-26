import React, {useEffect, useRef, useState} from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import cartSlice, {addProduct} from "../../../store/cartSlice";
import $ from 'jquery'


const FeaturedProduct = (props) => {
    const {pid, category, name, price, fileNames, discount, dcRatio, originPrice} = props.product

    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        dispatch(addProduct({id: pid, name: name, price: price, fileNames: fileNames[0]}))
    }
    const ref = useRef()

    return (
        <div className={category + " col-lg-2 col-md-4 col-sm-6 mix"}>
            <div className="featured__item">
                <div
                    className="featured__item__pic set-bg"
                    style={{backgroundImage : `url(${fileNames[0]})`}}
                >
                    {discount ? <div className="product__discount__percent">-{dcRatio}%</div> : null}
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
                    <h5>{price}원</h5>
                </div>
            </div>
        </div>

    );
};

export default FeaturedProduct;
