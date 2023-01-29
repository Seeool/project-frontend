import React, {useEffect, useState} from 'react';
import Product from "./Product";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import PreLoader from "../../PreLoader/PreLoader";

function LatestProductList(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://seol.site:9000/api/product/latestList")
            setProducts(response.data)
            setIsLoading(false)
        } catch (e) {
            alert(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const [carowsel, setCarowsel] = useState(false)
    useEffect(() => {
        setCarowsel(!carowsel)
    }, [products])
    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="latest-product__text">
                    <h4>신상품</h4>
                    <ReactOwlCarousel className={"latest-product__slider owl-carousel"} margin={0} items={1} nav={true}
                                      smartSpeed={1200}>
                        <div className="latest-prdouct__slider__item">
                            {products.map((product, index) => {
                                if (index < 3)
                                    return (<Product key={product.pid} product={product}/>)
                            })}
                        </div>
                        <div className="latest-prdouct__slider__item">
                            {products.map((product, index) => {
                                if (index > 2)
                                    return (<Product key={product.pid} product={product}/>)
                            })}
                        </div>
                    </ReactOwlCarousel>
                </div>
            </div>
            {isLoading ? <PreLoader/> : ''}
        </>
    );
}

export default LatestProductList;