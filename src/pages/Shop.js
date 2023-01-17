import React, {useEffect} from 'react';

import HeroSection from "../components/HeroSection/HeroSection";
import ProductDiscountList from "../components/Shop/ProductDiscount/ProductDiscountList";
import ProductFilter from "../components/Shop/ProductFilter";
import ProductList from "../components/Shop/ProductList/ProductList";
import ProductPagination from "../components/Shop/ProductList/ProductPagination";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import appendScript from "../appendScript";
import Banner from "../components/Banner";
import {useParams, useSearchParams} from "react-router-dom";

function Shop(props) {
    const [serchParams, setSearchParams] = useSearchParams();
    console.log(serchParams.toString())

    useEffect(() => {
        appendScript("./js/main.js")
    },[])
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <ShopSideBar/>
                        <div className="col-lg-9 col-md-7">
                            <ProductDiscountList/>
                            <ProductFilter/>
                            <ProductList/>
                            <ProductPagination/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;