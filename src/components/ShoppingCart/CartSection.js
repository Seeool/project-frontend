import React, {useEffect, useState} from 'react';
import CartProduct from "./CartProduct";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

function CartSection(props) {
    const [cookies, setCookie] = useCookies(['cart'])

    console.log(cookies.cart)
    const [total, setTotal] = useState(0)
    const [renderChange, setRenderChange] = useState(0)
    let subTotal = ''
    useEffect(() => {
        console.log("총계 계산")
        subTotal = document.querySelectorAll(".shoping__cart__total")
        let sum = 0
        for (let i = 0; i < subTotal.length; i++) {
            sum += parseInt(subTotal[i].querySelector("span").innerHTML)
        }
        setTotal(sum)
    },[renderChange])



    const cartProducts = [
        {
            id: 1,
            picUrl: 'img/cart/cart-1.jpg',
            name: 'Vegetable’s Package',
            price: '55.00',
            quantity: 1,
        },
        {
            id: 2,
            picUrl: 'img/cart/cart-2.jpg',
            name: 'Fresh Garden Vegetable',
            price: '39.00',
            quantity: 2,
        },
        {
            id: 3,
            picUrl: 'img/cart/cart-3.jpg',
            name: 'Organic Bananas',
            price: '69.00',
            quantity: 3,
        }
    ]
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__table">
                        <table>
                            <thead>
                            <tr>
                                <th className="shoping__product">Products</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>상품 금액</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartProducts.map((cartProduct) => (
                                <CartProduct key={cartProduct.id} cartProduct={cartProduct} renderChange={renderChange} setRenderChange={setRenderChange}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-lg-6">
                    <div className="shoping__cart__btns">
                        <Link to="/shop-grid" className="primary-btn cart-btn">쇼핑 계속하기</Link>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="shoping__checkout">
                        <h5>총 금액</h5>
                        <ul>
                            <li>합계 <span>\{total}</span></li>
                        </ul>
                        <a href="#" className="primary-btn">결제하기</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartSection;