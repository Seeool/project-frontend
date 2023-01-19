import React from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../store/cartSlice";

function ProductDiscount(props) {
    const {pid, fileNames, dcRatio, category, name, originPrice, price} = props.product

    const handleShow = props.handleShow

    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        handleShow()
        dispatch(addProduct({id: pid, name: name, price: price, fileNames: fileNames}))
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
                    <span>{category}</span>
                    <h5><Link to={`/shop-details?pid=${pid}`}>{name}</Link></h5>
                    <div className="product__item__price">
                        \{price} <span>{originPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDiscount;