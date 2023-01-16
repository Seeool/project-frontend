import React from 'react';
import Product from "./Product";

function ProductDiscount(props) {
    const products = [
        {
            id : 1,
            picUrl : 'img/02.jpg',
            ratio : '-20%',
            type : 'Dried Fruit',
            name : 'Raisin’n’nuts',
            salePrice : '$30.00',
            price : '36'
        },
        {
            id : 2,
            picUrl : 'img/product/discount/pd-2.jpg',
            ratio : '-20%',
            type : 'Dried Fruit',
            name : 'Raisin’n’nuts',
            salePrice : '$30.00',
            price : '36'
        }
    ]
    return (
        <div className="product__discount">
            <div className="section-title product__discount__title">
                <h2>특별 할인</h2>
            </div>
            <div className="row">
                <div className="product__discount__slider owl-carousel">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDiscount;