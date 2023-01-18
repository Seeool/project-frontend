import React from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

function Product(props) {
    const {id, picUrl, name, price} = props.product
    const handleShow = props.handleShow
    //useParams를 이용해 페이지처리??
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
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div
                    className="product__item__pic set-bg"
                    data-setbg={picUrl}
                >
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="#" onClick={addToCart}><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6><Link to={`/shop-details?pid=${id}`}>{name}</Link></h6>
                    <h5>{price}</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;