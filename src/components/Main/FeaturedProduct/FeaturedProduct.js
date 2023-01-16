import React, {useEffect, useState} from 'react';
import Product from "./Product";
import {Button, Modal} from "react-bootstrap";
import {useCookies} from "react-cookie";


const FeaturedProduct = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        console.log("handleshow 실행")
        setShow(true);
    }

    const products = [
        {
            id: 1,
            type: 'oranges',
            name: '테스트 육류',
            price: '$30.00',
            picUrl: 'img/02.jpg'
        },
        {
            id: 2,
            type: 'fresh-meat',
            name: '테스트 프레쉬미트',
            price: '$40.00',
            picUrl: 'img/featured/feature-2.jpg'
        },
        {
            id: 3,
            type: 'vegetables',
            name: '테스트 채소',
            price: '$50.00',
            picUrl: 'img/featured/feature-3.jpg'
        },
        {
            id: 4,
            type: 'fastfood',
            name: '테스트 패스트푸드',
            price: '$60.00',
            picUrl: 'img/featured/feature-4.jpg'
        }

    ]

    const [cookies, setCookie] = useCookies(['cart'])
    let addCartBtn = ''
    useEffect(() => {
        addCartBtn = document.querySelectorAll(".addCartBtn")
        for (let i=0;i<addCartBtn.length;i++) {
            addCartBtn[i].addEventListener("click", (e) => {
                e.preventDefault()

                console.log(document.cookie.match('cart').input)

                const name = addCartBtn[i].querySelector("input").value
                setCookie('cart', name)

            })
        }
    }, []);

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
                                    <li data-filter=".oranges">Oranges</li>
                                    <li data-filter=".fresh-meat">Fresh Meat</li>
                                    <li data-filter=".vegetables">Vegetables</li>
                                    <li data-filter=".fastfood">Fastfood</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {products.map((product) => (
                            <Product key={product.id} product={product} handleShow={handleShow}/>
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

export default FeaturedProduct;
