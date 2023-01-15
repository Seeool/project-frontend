import React from 'react';

function ProductDetails(props) {
    return (
        <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
                <h3>Vetgetable’s Package</h3>
                <div className="product__details__rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                    <span>(18 reviews)</span>
                </div>
                <div className="product__details__price">$50.00</div>
                <p>
                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                    dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                    vehicula elementum sed sit amet dui. Proin eget tortor risus.
                </p>
                <div className="product__details__quantity">
                    <div className="quantity">
                        <div className="pro-qty">
                            <input type="text" value="1"/>
                        </div>
                    </div>
                </div>
                <a href="src/components#" className="primary-btn">ADD TO CARD</a>
                <ul>
                    <li><b>재고</b> <span>In Stock</span></li>
                    <li>
                        <b>배송기간</b>
                        <span>약 1~2일 </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductDetails;