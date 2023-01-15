import React, {useEffect} from 'react';
import ProductPic from "../components/ShopDetails/ProductPic";
import ProductDetails from "../components/ShopDetails/ProductDetails";
import ProductDescription from "../components/ShopDetails/ProductDescription";
import appendScript from "../appendScript";

function ShopDetails(props) {
    useEffect(() => {
        appendScript("./js/main.js")
    },[])
    return (
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <ProductPic/>
                    <ProductDetails/>
                    <ProductDescription/>
                </div>
            </div>
        </section>

    );
}

export default ShopDetails;