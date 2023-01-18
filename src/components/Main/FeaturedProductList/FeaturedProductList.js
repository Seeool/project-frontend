import React, {useEffect, useState} from 'react';
import FeaturedProduct from "./FeaturedProduct";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import appendScript from "../../../appendScript";

const FeaturedProductList = () => {
    console.log("Main FeaturedProduct리스트 렌더링됨")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])
    const getProducts = async () => {
        console.log("axios 시작")
        await axios.get("http://localhost:9000/api/product/featuredList")
            .then(res => {
                let typesSet = new Set(Array.from(res.data.map((product) => {
                    return product.category
                })).sort())
                setTypes(Array.from(typesSet))
                setProducts(res.data)
                console.log("데이터 set 완료")
            })
            .catch(e => alert(e))
    }

    useEffect(() => {
        getProducts()
    },[])

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>인기 상품</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li className="active" data-filter="*">All</li>
                                    {types.map((type) => (
                                        <li key={type} data-filter={`.${type}`}>{type}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {products.map((product) => (
                            <FeaturedProduct key={product.pid} product={product} handleShow={handleShow}/>
                        ))}
                    </div>
                </div>
            </section>
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
};

export default FeaturedProductList;
