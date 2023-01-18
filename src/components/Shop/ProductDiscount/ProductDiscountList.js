import React, {useState} from 'react';
import ProductDiscount from "./ProductDiscount";
import {Button, Modal} from "react-bootstrap";

function ProductDiscountList(props) {
    console.log("할인상품리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }
    const products = [
        {
            pid: 1,
            picUrl: 'img/02.jpg',
            ratio: '-20%',
            type: 'Dried Fruit',
            name: '할인상품1',
            salePrice: '$30.00',
            price: '36'
        },
        {
            pid: 2,
            picUrl: 'img/product/discount/pd-2.jpg',
            ratio: '-20%',
            type: 'Dried Fruit',
            name: '할인상품2',
            salePrice: '$30.00',
            price: '36'
        },
        {
            pid: 3,
            picUrl: 'img/product/discount/pd-3.jpg',
            ratio: '-20%',
            type: 'Dried Fruit',
            name: '할인상품3',
            salePrice: '$30.00',
            price: '36'
        },
        {
            pid: 4,
            picUrl: 'img/product/discount/pd-4.jpg',
            ratio: '-20%',
            type: 'Dried Fruit',
            name: '할인상품4',
            salePrice: '$30.00',
            price: '36'
        }
    ]
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