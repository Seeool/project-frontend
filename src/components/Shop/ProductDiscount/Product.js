import React from 'react';

function Product(props) {
    const {picUrl, ratio, type, name, salePrice, price} = props.product
    return (
        <div className="col-lg-4">
            <div className="product__discount__item">
                <div
                    className="product__discount__item__pic set-bg"
                    data-setbg={picUrl}
                >
                    <div className="product__discount__percent">-20%</div>
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="src/components#"><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__discount__item__text">
                    <span>Dried Fruit</span>
                    <h5><a href="src/components#">Raisin’n’nuts</a></h5>
                    <div className="product__item__price">
                        $30.00 <span>$36.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;