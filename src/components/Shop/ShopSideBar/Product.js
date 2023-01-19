import React from 'react';
import {Link} from "react-router-dom";

const Product = (props) => {
    const {pid, name, price, fileNames} = props.product

    return (
        <Link to={`shop-details?pid=${pid}`} className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src={fileNames[0]} alt=""/>
            </div>
            <div className="latest-product__item__text">
                <h5>{name}</h5>
                <span>{price}원</span>
            </div>
        </Link>
    );
};

export default Product;
