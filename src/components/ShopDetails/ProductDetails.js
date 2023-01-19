import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import $ from 'jquery'
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProductWithQty} from "../../store/cartSlice";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

function ProductDetails(props) {
    const [quantities, setQuantities] = useState(1)
    const dispatch = useDispatch()
    // const params = new URLSearchParams(useLocation().search)
    const [params, setParams] = useSearchParams()
    const pid = params.get('pid')
    const plusQuantities = () => {
        setQuantities(quantities + 1)
    }
    const minusQuantities = () => {
        if (quantities > 0) {
            setQuantities(quantities - 1)
        }
    }

    const [product, setProduct] = useState({})
    const getProduct = async () => {
        await axios.get(`http://localhost:9000/api/product/${pid}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(e => console.log(e))
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        dispatch(addProductWithQty({id: product.pid, name : product.name, price : product.price, qty:quantities}))
        setShow(true);
    }
    const stars = () => {
        let integer = Math.floor(product.reviewAvg)
        let decimal = product.reviewAvg - Math.floor(product.reviewAvg)
        if (decimal >= 0.5) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
        if (decimal < 0.5) {
            $(".product__details__rating").prepend('<i class="fa fa-star-half-o"></i>')
        }
        for (let i=0; i<integer; i++) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
    }
    useEffect(() => {
        getProduct()
    },[])
    useEffect(() => {
        stars()
    },[product])

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                    <div className="product__details__pic__item">
                        <img
                            className="product__details__pic__item--large"
                            src="img/product/details/product-details-1.jpg"
                            alt=""
                        />
                    </div>
                    <div className="product__details__pic__slider owl-carousel">
                        <img
                            data-imgbigurl="img/product/details/product-details-2.jpg"
                            src="img/product/details/thumb-1.jpg"
                            alt=""
                        />
                        <img
                            data-imgbigurl="img/product/details/product-details-3.jpg"
                            src="img/product/details/thumb-2.jpg"
                            alt=""
                        />
                        <img
                            data-imgbigurl="img/product/details/product-details-5.jpg"
                            src="img/product/details/thumb-3.jpg"
                            alt=""
                        />
                        <img
                            data-imgbigurl="img/product/details/product-details-4.jpg"
                            src="img/product/details/thumb-4.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <h3>{product.name}</h3>
                    <div className="product__details__rating">
                        <span>{product.reviewAvg}</span>
                        <span>({product.reviewCount} reviews)</span>
                    </div>
                    <div className="product__details__price">${product.price}</div>
                    <p>
                        {product.text}
                    </p>
                    <div className="product__details__quantity">
                        <div className="quantity">
                            <div className="pro-qty">
                                <span className="dec qtybtn" onClick={minusQuantities}>-</span>
                                <input type="text" value={quantities} readOnly/>
                                <span className="inc qtybtn" onClick={plusQuantities}>+</span>
                            </div>
                        </div>
                    </div>
                    <a href={"#"} className="primary-btn" onClick={handleShow}>장바구니에 담기</a>
                    <ul>
                        <li><b>재고</b> <span>{product.stock>0 ? '재고 있음' : '재고없음'}</span></li>
                        <li>
                            <b>배송기간</b>
                            <span>약 1~2일 </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            제품 설명
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="product__details__tab__desc">
                                <h6>Products Infomation</h6>
                                <p>제품 설명 글</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size="sm" centered show={show} onHide={handleClose}>
                <Modal.Body><h5>장바구니에 담았습니다</h5></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductDetails;