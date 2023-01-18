import React from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

function ProductDiscount(props) {
    const {id, picUrl, ratio, type, name, salePrice, price} = props.product

    //useParams를 이용해 페이지처리??
    const handleShow = props.handleShow
    const [cookies, setCookie] = useCookies(['cart'])
    const addToCart = (e) => {
        e.preventDefault()
        handleShow()
        if(cookies.cart !== undefined) {
            setCookie('cart', cookies.cart + '/' + id)
        }
        else {
            setCookie('cart', id)
        }
    }

    return (
        <div className="col-lg-4">
            <div className="product__discount__item">
                <div
                    className="product__discount__item__pic set-bg"
                    data-setbg={picUrl}
                >
                    <div className="product__discount__percent">-20%</div>
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="#" onClick={addToCart}><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__discount__item__text">
                    <span>Dried Fruit</span>
                    <h5><Link to={`/shop-details?pid=${id}`}>{name}</Link></h5>
                    <div className="product__item__price">
                        $30.00 <span>$36.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDiscount;