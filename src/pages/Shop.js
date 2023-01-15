import React, {useEffect} from 'react';

import HeroSection from "../components/HeroSection/HeroSection";
import ProductDiscount from "../components/Shop/ProductDiscount/ProductDiscount";
import ProductFilter from "../components/Shop/ProductFilter";
import ProductList from "../components/Shop/ProductList/ProductList";
import ProductPagination from "../components/Shop/ProductList/ProductPagination";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import appendScript from "../appendScript";
import Banner from "../components/Banner";

function Shop(props) {
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
                            <ProductDiscount/>
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