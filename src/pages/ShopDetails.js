import React, {useEffect, useRef} from 'react';
import ProductDetails from "../components/ShopDetails/ProductDetails";
import ProductReviews from "../components/ShopDetails/ProductReviews";
import appendScript from "../appendScript";
import {useParams} from "react-router-dom";

function ShopDetails(props) {
    const {pid} = useParams()
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current.scrollIntoView({behivor : 'smooth'})
        appendScript("./js/main.js")
    },[])
    return (
        <section ref={scrollRef} className="product-details spad">
            <div className="container">
                <div className="row">
                    <ProductDetails/>
                    <ProductReviews/>
                </div>
            </div>
        </section>
    );
}

export default ShopDetails;