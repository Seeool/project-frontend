import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../store/cartSlice";

function ProductDiscount(props) {
    const {pid, fileNames, dcRatio, name, originPrice, price} = props.product
    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        dispatch(addProduct({id: pid, name: name, price: price, fileNames: fileNames[0]}))
    }

    return (
        <div className="col-lg-4">
            <div className="product__discount__item">
                <div
                    className="product__discount__item__pic set-bg"
                    style={{backgroundImage : `url(${fileNames[0]})`}}
                >
                    <div className="product__discount__percent">-{dcRatio}%</div>
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="#" onClick={addToCart}><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__discount__item__text">
                    <h5><Link to={`/shop-details?pid=${pid}`}>{name}</Link></h5>
                    <div className="product__item__price">
                        {price}원 <span>{originPrice}원</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDiscount;