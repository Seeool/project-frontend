import React, {useEffect, useState} from 'react';
import FeaturedProduct from "./FeaturedProduct";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import $ from 'jquery'

const FeaturedProductList = () => {
    console.log("Main FeaturedProduct리스트 렌더링")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }


    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const categoryNames = ["과일","정육/계란","밀키트","냉장/냉동/간편식","통조림/즉석밥/면","쌀/잡곡","베이커리","장/양념/소스","우유/유제품","채소","건강식품"]
    const getProducts = async () => {
        try {
            const response = await axios.get("/api/product/featuredList")
            const data = response.data
            setProducts(data)
            let categorySet = new Set(Array.from(data.map((product) => {
                return product.category
            })).sort())
            setCategories(Array.from(categorySet))
        } catch (err) {
            alert(err)
        }

    }
    useEffect(() => {
        getProducts()
    },[])

    useEffect(() => {
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
            let filter = $(this).data('filter')
            console.log(filter)
            if ($(this).data('filter') === '*') {
                $('.featured__filter').find('.mix').fadeIn()
            }
            else {
                $('.featured__filter').find('.mix').hide()
                $('.featured__filter').find(filter).fadeIn()
            }
        });
    },[products])

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>인기 상품 TOP12</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li className="active" data-filter="*">전체</li>
                                    {categories.map((category) => (
                                        <li key={category} data-filter={`.${category}`}>{categoryNames[category]}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {products.map((product) => (
                            <FeaturedProduct  key={product.pid} product={product} handleShow={handleShow}/>
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
