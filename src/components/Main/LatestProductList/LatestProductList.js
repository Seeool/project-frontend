import React, {useEffect, useState} from 'react';
import Product from "./Product";
import axios from "axios";

function LatestProductList(props) {
    console.log("신상품 리렌더링")

    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/product/latestList")
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
                <h4>신상품</h4>
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

export default LatestProductList;