import React, {useEffect, useState} from 'react';
import Product from "./Product";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

function ProductList(props) {
    console.log("Shop-grid 상품리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/list")
            const data = response.data
            setProducts(data)
            let typesSet = new Set(Array.from(data.map((product) => {
                return product.category
            })).sort())
            setTypes(Array.from(typesSet))
        } catch (err) {
            alert(err)
        }

    }
    useEffect(() => {
        getProducts()
    },[])
    return (
        <>
            <div className="row">
                {products.map((product) => (
                    <Product key={product.pid} product={product} handleShow={handleShow}/>
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