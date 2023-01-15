import React from 'react';

function ProductPic(props) {
    return (
        <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
                <div className="product__details__pic__item">
                    <img
                        className="product__details__pic__item--large"
                        src="img/product/details/product-details-1.jpg"
                        alt=""
                    />
                </div>
                <div className="product__details__pic__slider owl-carousel">
                    <img
                        data-imgbigurl="img/product/details/product-details-2.jpg"
                        src="img/product/details/thumb-1.jpg"
                        alt=""
                    />
                    <img
                        data-imgbigurl="img/product/details/product-details-3.jpg"
                        src="img/product/details/thumb-2.jpg"
                        alt=""
                    />
                    <img
                        data-imgbigurl="img/product/details/product-details-5.jpg"
                        src="img/product/details/thumb-3.jpg"
                        alt=""
                    />
                    <img
                        data-imgbigurl="img/product/details/product-details-4.jpg"
                        src="img/product/details/thumb-4.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPic;