import React from 'react';
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import LatestProduct from "./LatestProduct/LatestProduct";
import TopRatedProduct from "./TopRatedProduct/TopRatedProduct";

function LatestProductSection(props) {
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <LatestProduct/>
                    <TopRatedProduct/>
                </div>
            </div>
        </section>
    );
}

export default LatestProductSection;