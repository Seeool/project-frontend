import React, {useEffect, useRef} from 'react';
import ProductDetails from "../components/ShopDetails/ProductDetails";
import ProductReviews from "../components/ShopDetails/ProductReviews";
import appendScript from "../appendScript";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import styled from "styled-components";
import {useSelector} from "react-redux";

const ModifyBtnDiv = styled.div`
  float: right;
  
`
function ShopDetails(props) {
    const scrollRef = useRef()
    const [params, setParams] = useSearchParams()
    const pid = params.get("pid")
    const userRole = useSelector(store => store.user.userRole)

    useEffect(() => {
        scrollRef.current.scrollIntoView({behivor : 'smooth'})
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