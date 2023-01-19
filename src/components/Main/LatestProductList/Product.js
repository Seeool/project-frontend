import React from 'react';
import {Link} from "react-router-dom";

const Product = (props) => {
    const {pid, name, price, fileNames, regDate} = props.product

    const date = new Date(regDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()

    return (
        <Link to={`shop-details?pid=${pid}`} className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src={fileNames[0]} alt=""/>
            </div>
            <div className="latest-product__item__text">
                <h5>{name}</h5>
                <span>{year}년{month}월</span>
                <span>\{price}</span>
            </div>
        </Link>
    );
};

export default Product;
