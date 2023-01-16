import React from 'react';
import Product from "./Product";

function ProductList(props) {
    const products = [
        {
            id : 1,
            picUrl : 'img/02.jpg',
            name : '상품 테스트1',
            price : '$30.00'
        },
        {
            id : 2,
            picUrl : 'img/product/product-2.jpg',
            name : '상품 테스트2',
            price : '$30.00'
        },
        {
            id : 3,
            picUrl : 'img/product/product-3.jpg',
            name : '상품 테스트3',
            price : '$30.00'
        },
        {
            id : 4,
            picUrl : 'img/product/product-4.jpg',
            name : '상품 테스트4',
            price : '$30.00'
        },
        {
            id : 5,
            picUrl : 'img/product/product-5.jpg',
            name : '상품 테스트4',
            price : '$30.00'
        }
    ]
    return (
        <div className="row">
            {products.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    );
}

export default ProductList;