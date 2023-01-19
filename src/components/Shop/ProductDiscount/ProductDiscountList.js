import React, {useEffect, useState} from 'react';
import ProductDiscount from "./ProductDiscount";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import appendScript from "../../../appendScript";
import ReactOwlCarousel from "react-owl-carousel";

function ProductDiscountList(props) {
    console.log("할인상품리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/discoutList")
            setProducts(response.data)
            console.log(response.data)
        }catch (e) {
            alert(e)
        }
    }
    useEffect(() => {
        getProducts()

    },[])

    return (
        <>
            <div className="product__discount">
                <div className="section-title product__discount__title">
                    <h2>할인중</h2>
                </div>
                <div className="row">
                    <div className="product__discount__slider owl-carousel">
                        {products.map((product) => (
                            <ProductDiscount key={product.pid} product={product} handleShow={handleShow}/>
                        ))}
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

export default ProductDiscountList;