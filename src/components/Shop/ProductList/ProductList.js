import React, {createRef, useEffect, useRef, useState} from 'react';
import Product from "./Product";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import $ from 'jquery'
import ProductPagination from "./ProductPagination";

function ProductList(props) {
    console.log("Shop-grid 상품리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const [params, setParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [size, setSize] = useState()
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()
    const [end, setEnd] = useState()
    const [start, setStart] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(0)
    const getProducts = async () => {
        try {
            let category = params.get('category')
            let keyword = params.get('keyword')
            if (category == null) {category = ''}
            if (keyword == null) {keyword = ''}
            const response = await axios.get(`http://localhost:9000/api/product/list?category=${category}&keyword=${keyword}&sort=${sort}&page=${page}`)
            const data = response.data
            setProducts(data.dtoList)
            setSize(data.size)
            setPrev(data.prev)
            setNext(data.next)
            setEnd(data.end)
            setStart(data.start)
            setTotal(data.total)
        } catch (err) {
            alert(err)
        }
    }

    const handleSort = (e => {
        setSort(e.target.value)
    })

    const movePage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        $(e.target).siblings().removeClass("active")
        $(e.target).addClass("active")
        setPage(e.target.innerHTML)
    }
    const nextPage = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setPage(end + 1)
    }
    const prevPage = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setPage(start - 1)
    }
    //상품을 목록변경(쿼리스트링변경), 페이지, 분류가 변할때마다 새로 불러와야함
    useEffect(() => {
        getProducts()
    },[params, page, sort])

    //목록변경(쿼리스트링변경)시 페이지를 1로 초기화해야함
    useEffect(() => {
        setPage(1)
    }, [params]);

    return (
        <>
            <div className="filter__item">
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="filter__sort">
                            <span>정렬</span>
                            <select className="form-control-sm" style={{marginLeft: '5px'}} onChange={handleSort}>
                                <option value="0">인기(내림차순)</option>
                                <option value="1">인기(오름차순</option>
                                <option value="2">가격(내림차순)</option>
                                <option value="3">가격(오름차순)</option>
                                <option value="4">등록(내림차순)</option>
                                <option value="5">등록(오름차순)</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="filter__found">
                            <h6><span>{total}</span> 개의 상품이 있습니다.</h6>
                        </div>
                    </div>
                </div>
            </div>
            <ProductPagination start={start} page={page} end={end} prev={prev} next={next} movePage={movePage} nextPage={nextPage} prevPage={prevPage}/>
            <br />
            <div className="row">
                {products.map((product) => (
                    <Product key={product.pid} product={product} handleShow={handleShow}/>
                ))}
            </div>
            <ProductPagination start={start} page={page} end={end} prev={prev} next={next} movePage={movePage} nextPage={nextPage} prevPage={prevPage}/>

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