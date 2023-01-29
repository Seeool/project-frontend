import React, {useEffect, useRef} from 'react';
import ProductReviews from "../components/ShopDetails/ProductReviews";
import {useNavigate, useSearchParams} from "react-router-dom";
import ProductDetailsModify from "../components/ShopDetails/ProductDetailsModify";
import {useSelector} from "react-redux";

function ShopDetailsModify(props) {
    const userRole = useSelector(store => store.user.userRole)
    const navigate = useNavigate()
    useEffect(() => {
        if (userRole !== "ADMIN" && userRole !== "MANAGER") {
            navigate("/")
        }
    },[])

    return (
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <ProductDetailsModify/>
                </div>
            </div>
        </section>
    );
}

export default ShopDetailsModify;