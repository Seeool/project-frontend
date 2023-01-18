import React from 'react';
import {Link} from "react-router-dom";

const Product = (props) => {
    const {id, picUrl, title, price} = props.product
    return (
        <Link to={`shop-details?pid=${id}`} className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src={picUrl} alt=""/>
            </div>
            <div className="latest-product__item__text">
                <h6>{title}</h6>
                <span>{price}</span>
            </div>
        </Link>
    );
};

export default Product;
