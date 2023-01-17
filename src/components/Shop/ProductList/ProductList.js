import React, {useState} from 'react';
import Product from "./Product";
import {Button, Modal} from "react-bootstrap";

function ProductList(props) {
    console.log("Shop-grid 상품리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const products = [
        {
            id: 1,
            picUrl: 'img/02.jpg',
            name: '상품 테스트1',
            price: '$30.00'
        },
        {
            id: 2,
            picUrl: 'img/product/product-2.jpg',
            name: '상품 테스트2',
            price: '$30.00'
        },
        {
            id: 3,
            picUrl: 'img/product/product-3.jpg',
            name: '상품 테스트3',
            price: '$30.00'
        },
        {
            id: 4,
            picUrl: 'img/product/product-4.jpg',
            name: '상품 테스트4',
            price: '$30.00'
        },
        {
            id: 5,
            picUrl: 'img/product/product-5.jpg',
            name: '상품 테스트4',
            price: '$30.00'
        }
    ]
    return (
        <>
            <div className="row">
                {products.map((product) => (
                    <Product key={product.id} product={product} handleShow={handleShow}/>
                ))}
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

export default ProductList;