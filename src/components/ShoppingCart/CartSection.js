import React, {useEffect, useState} from 'react';
import CartProduct from "./CartProduct";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
import cartReducer from "../../store/cartSlice";
import CartReducer from "../../store/cartSlice";


function CartSection(props) {
    const [cookies, setCookie] = useCookies(['cart'])
    console.log('CartSection 리렌더링')

    const {cart} = useSelector(store => store)

    const [total, setTotal] = useState(0)
    const [renderChange, setRenderChange] = useState(0)

    useEffect(() => {
        let subTotal = document.querySelectorAll(".shoping__cart__total")
        let sum = 0
        for (let i = 0; i < subTotal.length; i++) {
            sum += parseInt(subTotal[i].querySelector("span").innerHTML)
        }
        setTotal(sum)
    },[renderChange])

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
                            {cart.cart.map((cartProduct) => (
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