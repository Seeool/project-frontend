import React from 'react';

const MyComponent = (props) => {
    const {picUrl, title, price} = props.product
    return (
        <a href="src/components/Shop/ShopSideBar#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src={picUrl} alt=""/>
            </div>
            <div className="latest-product__item__text">
                <h6>{title}</h6>
                <span>{price}</span>
            </div>
        </a>
    );
};

export default MyComponent;
