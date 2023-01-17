import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import $ from 'jquery'
import axios from "axios";

function ProductDetails(props) {
    const [quantities, setQuantities] = useState(1)
    const plusQuantities = () => {
        setQuantities(quantities + 1)
    }
    const minusQuantities = () => {
        if (quantities > 0) {
            setQuantities(quantities - 1)
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true);
    }
    // const product =
    //     {
    //         id : 1,
    //         name : 'Vetgetable’s Package',
    //         reviewCount : 18,
    //         price : 50,
    //         text : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.\n' +
    //             '                        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet\n' +
    //             '                        dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam\n' +
    //             '                        vehicula elementum sed sit amet dui. Proin eget tortor risus.',
    //         avgGrade : 4.2,
    //         stock : 50
    //     }
    const [product, setProduct] = useState({})
    const getProductt = async () => {
        await axios.get("http://localhost:9000/api/product/1")
            .then(res => {
                    setProduct(res.data)
            })
            .catch(e => console.log(e))
    }
    const stars = () => {
        let integer = Math.floor(product.avgGrade)
        let decimal = product.avgGrade - Math.floor(product.avgGrade)
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
        getProductt()
        stars()
        console.log(product)
    },[])

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <h3>{product.name}</h3>
                    <div className="product__details__rating">
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