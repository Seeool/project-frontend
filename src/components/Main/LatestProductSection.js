import React from 'react';
import FeaturedProductList from "./FeaturedProductList/FeaturedProductList";
import LatestProductList from "./LatestProductList/LatestProductList";
import TopRatedProductList from "./TopRatedProductList/TopRatedProductList";

function LatestProductSection(props) {
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <LatestProductList/>
                    <TopRatedProductList/>
                </div>
            </div>
        </section>
    );
}

export default LatestProductSection;