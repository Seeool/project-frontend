import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import $ from "jquery";

const Product = (props) => {
    const {pid, name, price, reviewAvg, fileNames} = props.product
    return (
        <Link to={`shop-details?pid=${pid}`} className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src={fileNames} alt=""/>
            </div>
            <div className="latest-product__item__text">
                <h5>{name}</h5>
                <span><i className="fa fa-star" style={{color: '#EDBB0E'}}></i>{reviewAvg.toFixed(1)}</span>
                <span>\{price}</span>
            </div>
        </Link>
    );
};

export default Product;
