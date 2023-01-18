import React, {useEffect} from 'react';
import ProductPic from "../components/ShopDetails/ProductPic";
import ProductDetails from "../components/ShopDetails/ProductDetails";
import ProductReviews from "../components/ShopDetails/ProductReviews";
import appendScript from "../appendScript";
import {useParams} from "react-router-dom";

function ShopDetails(props) {
    const {pid} = useParams()
    console.log(pid)
    useEffect(() => {
        appendScript("./js/main.js")
    },[])
    return (
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <ProductPic/>
                    <ProductDetails/>
                    <ProductReviews/>
                </div>
            </div>
        </section>
    );
}

export default ShopDetails;