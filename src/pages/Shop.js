import React, {useEffect} from 'react';

import ProductDiscountList from "../components/Shop/ProductDiscount/ProductDiscountList";
import ProductList from "../components/Shop/ProductList/ProductList";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import appendScript from "../appendScript";
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
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;