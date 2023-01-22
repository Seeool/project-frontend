import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import $ from 'jquery'
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProductWithQty} from "../../store/cartSlice";
import {useSearchParams} from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import styled from "styled-components";

const OriginPrice = styled.span`
  font-size: 25px;
  color: #1c1c1c;
  text-decoration: line-through;
`

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
    const [fileNames, setfileNames] = useState([])
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://172.30.1.1:9000/api/product/${pid}`)
            console.log(response.data)
            console.log(response.data.fileNames)
            setProduct(response.data)
            setfileNames(response.data.fileNames)
        } catch (e) {
            alert(e)
        }
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        dispatch(addProductWithQty({
            id: product.pid,
            name: product.name,
            price: product.price,
            fileNames: fileNames[0],
            qty: quantities
        }))
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
        for (let i = 0; i < integer; i++) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    const [carowsel, setCarowsel] = useState(false)
    const calcStock = () => {
        if (product.stock > 100) {
            return <span>재고 있음 (100개 이상)</span>
        } else if (product.stock > 10) {
            return <span>재고 있음 ({product.stock}개)</span>
        } else if (product.stock > 0) {
            return <span style={{color: 'red'}}>품절 임박 ({product.stock}개)</span>
        } else {
            return <span style={{color: 'red'}}>품절</span>
        }
    }
    useEffect(() => {
        stars()
        setCarowsel(!carowsel)
    }, [product])

    useEffect(() => {
        $('.product__details__pic__slider img').on('click', function () {
            var imgurl = $(this).data('imgbigurl');
            var bigImg = $('.product__details__pic__item--large').attr('src');
            if (imgurl != bigImg) {
                $('.product__details__pic__item--large').attr({
                    src: imgurl
                });
            }
        });
    },[carowsel])

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                    <div className="product__details__pic__item">
                        <img
                            className="product__details__pic__item--large"
                            src={fileNames[0]}
                            alt=""
                        />
                    </div>
                    <ReactOwlCarousel margin={20} items={4} dots={true} smartSpeed={1200}
                                      className={"product__details__pic__slider"}>
                        {fileNames.map((img, index) => (
                            <img data-imgbigurl={img}
                                 src={img}
                                 key={index}
                                 alt=""/>
                        ))}
                    </ReactOwlCarousel>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <h3>{product.name}</h3>

                    <div className="product__details__rating">
                        <span>{product.reviewAvg?.toFixed(1)}</span>
                        <span>({product.reviewCount} 개의 리뷰)</span>
                    </div>
                    {product.discount === true ? <h5 style={{color: '#dd2222'}}>{product.dcRatio}% 할인 중</h5> : ''}
                    <div className="product__details__price">{product.price}원 {product.discount === true ?
                        <OriginPrice>{product.originPrice}원</OriginPrice> : ''}</div>
                    <p>
                        {product.text}
                    </p>
                    {product.stock > 0 ?
                        <>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <button><span className="dec detailqtybtn" onClick={minusQuantities}>-</span>
                                        </button>
                                        <input type="text" value={quantities} readOnly/>
                                        <button><span className="inc detailqtybtn" onClick={plusQuantities}>+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <a href={"#"} className="primary-btn" onClick={handleShow}>장바구니에 담기</a>
                        </> : ''}
                    <ul>
                        <li><b>재고</b>{calcStock()}</li>
                        <li>
                            <b>배송기간</b>
                            <span>약 1~2일 </span>
                        </li>
                    </ul>
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