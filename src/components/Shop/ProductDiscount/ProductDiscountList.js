import React, {useEffect, useState} from 'react';
import ProductDiscount from "./ProductDiscount";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import {useSearchParams} from "react-router-dom";

function ProductDiscountList(props) {
    const [products, setProducts] = useState([])
    const [params, setParams] = useSearchParams()
    const getProducts = async () => {
        try {
            let category = params.get('category')
            let keyword = params.get('keyword')
            if (category == null) {category = ''}
            if (keyword == null) {keyword = ''}
            const response = await axios.get(`http://localhost:9000/api/product/discoutList?category=${category}&keyword=${keyword}`)
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
                    {products.length < 1 ? <h2>할인중인 상품이 없어요...</h2> : null}
                    <ReactOwlCarousel margin={0} dots={true} responsive={{0: {items: 1}, 990: {items :2}, 1200: {items : 3} }} className={"product__discount__slider"}>
                        {products.map((product) => (
                            <ProductDiscount key={product.pid} product={product} />
                        ))}
                    </ReactOwlCarousel>
                </div>
            </div>
        </>
    );
}

export default ProductDiscountList;