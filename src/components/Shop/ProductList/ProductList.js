import React, {createRef, useEffect, useRef, useState} from 'react';
import Product from "./Product";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import $ from 'jquery'

function ProductList(props) {
    console.log("Shop-grid 상품리스트 렌더링")
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
            const response = await axios.get(`http://localhost:9000/api/product/list?category=${category}`)
            const data = response.data
            setProducts(data)
        } catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        getProducts()
    },[params])


    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const total = products.length
    const numPages = Math.ceil(total / limit)




    return (
        <>
            <div className="filter__item">
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="filter__sort">
                            <span>정렬</span>
                            <select className="form-control-sm" style={{marginLeft: '5px'}}>
                                <option value="0">인기(내림차순)</option>
                                <option value="1">인기(오름차순</option>
                                <option value="2">가격(오름차순)</option>
                                <option value="3">가격(내림차순)</option>
                                <option value="4">등록(오름차순)</option>
                                <option value="5">등록(내림차순)</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="filter__found">
                            <h6><span>{products.length}</span> 개의 상품이 있습니다.</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {products.map((product) => (
                    <Product key={product.pid} product={product} handleShow={handleShow}/>
                ))}
            </div>
            <div className="product__pagination">
                {Array(numPages).fill().map((_,i) => (
                    <Link key={i+1} onClick={() => setPage(i + 1)} >{i+1}</Link>
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