import React, {useEffect, useState} from 'react';
import ProductDiscount from "./ProductDiscount";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import appendScript from "../../../appendScript";
import ReactOwlCarousel from "react-owl-carousel";
import {useSearchParams} from "react-router-dom";

function ProductDiscountList(props) {
    console.log("할인상품리스트 렌더링")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const [products, setProducts] = useState([])
    const [params, setParams] = useSearchParams()
    const getProducts = async () => {
        try {
            const category = params.get('category')
            const response = await axios.get(`http://localhost:9000/api/product/discoutList?category=${category}`)
            setProducts(response.data)
        }catch (e) {
            alert(e)
        }
    }
    useEffect(() => {
        getProducts()
    },[params])

    const [carowsel, setCarowsel] = useState(false)
    useEffect(() => {
        setCarowsel(!carowsel)
    },[products])
    return (
        <>
            <div className="product__discount">
                <div className="section-title product__discount__title">
                    <h2>할인중</h2>
                </div>
                <div className="row">
                    <ReactOwlCarousel margin={0} items={3} dots={true} className={"product__discount__slider"}>
                        {products.map((product) => (
                            <ProductDiscount key={product.pid} product={product} handleShow={handleShow}/>
                        ))}
                    </ReactOwlCarousel>
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