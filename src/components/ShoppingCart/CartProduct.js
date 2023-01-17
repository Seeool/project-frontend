import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery'
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {addProduct, deleteProduct, minusProduct} from "../../store/cartReducer";

function CartProduct(props) {
    const {id, qty} = props.cartProduct
    const [quantities, setQuantities] = useState(1)
    const [cookies, setCookie, removeCookie] = useCookies(['cart'])
    const dispatch = useDispatch()

    //백엔드와의 통신으로 picUrl, name, price를 가져와야함

    const plusQty = () => {
        console.log("plusQty 실행")
        dispatch(addProduct({id : id}))
        props.setRenderChange(props.renderChange + 1)
    }
    const minusQty = () => {
        if (qty > 1) {
            dispatch(minusProduct({id : id}))
            props.setRenderChange(props.renderChange + 1)
        }
    }

    // const set = new Set(cookies.cart.split('/'))
    // const close = () => {
    //     // visibility.current.style.display = 'none'
    //     setQuantities(0)
    //     props.setRenderChange(props.renderChange + 1)
    //     if (set.size === 1) {
    //         removeCookie('cart')
    //     } else {
    //         setCookie('cart', cookies.cart.split('/').filter(arr => arr !== id).join('/'))
    //     }
    // }
    //
     const visibility = useRef()

    const close = () => {
        dispatch(deleteProduct({id: id}))
    }

    return (
        <tr ref={visibility}>
            <td>제품번호{id}</td>
            <td className="shoping__cart__item">
                <img src='/img/02.jpg' alt=""/>
                <h5>샘플 이름</h5>
            </td>
            <td className="shoping__cart__price">
                \50
            </td>
            <td className="shoping__cart__quantity">
                <div className="quantity">
                    <div className="pro-qty">
                        <span className="dec qtybtn" onClick={minusQty}>-</span>
                        <input type="text" value={qty} readOnly/>
                        <span className="inc qtybtn" onClick={plusQty}>+</span>
                    </div>
                </div>
            </td>
            <td className="shoping__cart__total">
                \<span>{50 * qty}</span>
            </td>
            <td className="shoping__cart__item__close">
                <span className="icon_close" onClick={close}></span>
            </td>
        </tr>
    );
}

export default CartProduct;