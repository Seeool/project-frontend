import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../store/cartSlice";

function Product(props) {
    const {pid, name, price, fileNames} = props.product
    const handleShow = props.handleShow
    //useParams를 이용해 페이지처리??

    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        handleShow()
        dispatch(addProduct({id: pid, name: name, price: price, fileNames: fileNames[0]}))
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div
                    className="product__item__pic set-bg"
                    style={{backgroundImage : `url(${fileNames[0]})`}}
                >
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="#" onClick={addToCart}><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6><Link to={`/shop-details?pid=${pid}`}>{name}</Link></h6>
                    <h5>{price}원</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;