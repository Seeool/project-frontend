import React, {useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

const Product = (props) => {
    const {type, name, price, picUrl} = props.product

    return (
        <div className={type+" col-lg-3 col-md-4 col-sm-6 mix"}>
            <div className="featured__item">
                <div
                    className="featured__item__pic set-bg"
                    data-setbg={picUrl}
                >
                    <ul className="featured__item__pic__hover">
                        <li>
                            <Link to={`src/${name}`}><i className="fa fa-heart"></i></Link>
                        </li>
                        <li>
                            <a href="src/components#"><i className="fa fa-retweet"></i></a>
                        </li>
                        <li>
                            <a href="src/components#"><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="featured__item__text">
                    <h6><a href="src/components#">{props.name}</a></h6>
                    <h5>{price}</h5>
                </div>
            </div>
        </div>
    );
};

export default Product;
