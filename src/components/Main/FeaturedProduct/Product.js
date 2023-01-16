import React, {useEffect, useRef, useState} from 'react';

const Product = (props) => {

    const {type, name, price, picUrl} = props.product
    const handleShow = props.handleShow
    const addToCart = () => {
        handleShow()

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
                                <a className="addCartBtn" href="src/components#"  >
                                    <i className="fa fa-shopping-cart"></i>
                                    <input type={'hidden'} value={name}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="featured__item__text">
                        <h6><a href="src/components#">{props.name}</a></h6>
                        <h5>{price}</h5>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Product;
