import React, {useEffect, useState} from 'react';
import Product from "./Product";
import axios from "axios";

function TopRatedProductList(props) {
    console.log("평점 높은 상품 리렌더링")
    // const products = [
    //     {
    //         id : 1,
    //         title : '테스트1',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-1.jpg'
    //     },
    //     {
    //         id : 2,
    //         title : '테스트2',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-2.jpg'
    //     },
    //     {
    //         id : 3,
    //         title : '테스트3',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-3.jpg'
    //     },
    //     {
    //         id : 4,
    //         title : '테스트4',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-2.jpg'
    //     },
    //     {
    //         id : 5,
    //         title : '테스트5',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-3.jpg'
    //     },
    //     {
    //         id : 6,
    //         title : '테스트6',
    //         price : '$30',
    //         picUrl : 'img/latest-product/lp-1.jpg'
    //     }
    // ]
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/topRatedList")
            setProducts(response.data)
            console.log(response.data)
        }catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getProducts()
    },[])
    return (
        <div className="col-lg-6 col-md-6">
            <div className="latest-product__text">
                <h4>평점 높은 상품</h4>
                <div className="latest-product__slider owl-carousel">
                    <div className="latest-prdouct__slider__item">
                        {products.map((product, index) => {
                            if(index < 3)
                                return(<Product key={product.pid} product={product}/> )
                        })}
                    </div>
                    <div className="latest-prdouct__slider__item">
                        {products.map((product, index) => {
                            if(index > 2)
                                return(<Product key={product.pid} product={product}/> )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopRatedProductList;