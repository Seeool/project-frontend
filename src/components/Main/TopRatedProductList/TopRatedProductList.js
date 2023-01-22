import React, {useEffect, useState} from 'react';
import Product from "./Product";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";

function TopRatedProductList(props) {
    console.log("평점 높은 상품 리렌더링")
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("/api/product/topRatedList")
            setProducts(response.data)
            console.log(response.data)
        }catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getProducts()
    },[])

    const [carowsel, setCarowsel] = useState(false)
    useEffect(() => {
        setCarowsel(!carowsel)
    },[products])

    return (
        <div className="col-lg-6 col-md-6">
            <div className="latest-product__text">
                <h4>평점 높은 상품</h4>
                <ReactOwlCarousel className={"latest-product__slider owl-carousel"} margin={0} items={1} nav={true} smartSpeed={1200}>
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
                </ReactOwlCarousel>
            </div>
        </div>
    );
}

export default TopRatedProductList;