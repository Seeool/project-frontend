import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery'
import {useCookies} from "react-cookie";

function CartProduct(props) {
    const {id} = props.cartProduct
    const [quantities, setQuantities] = useState(1)
    const [cookies, setCookie, removeCookie] = useCookies(['cart'])

    //백엔드와의 통신으로 picUrl, name, price를 가져와야함

    const plusQuantities = () => {
        setQuantities(quantities + 1)
        props.setRenderChange(props.renderChange + 1)
    }
    const minusQuantities = () => {
        if (quantities > 1) {
            setQuantities(quantities - 1)
            props.setRenderChange(props.renderChange + 1)
        }
    }

    const set = new Set(cookies.cart.split('/'))
    const close = () => {
        visibility.current.style.display = 'none'
        setQuantities(0)
        props.setRenderChange(props.renderChange + 1)
        if (set.size === 1) {
            removeCookie('cart')
        } else {
            setCookie('cart', cookies.cart.split('/').filter(arr => arr !== id).join('/'))
        }
    }

    const visibility = useRef()

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
                        <span className="dec qtybtn" onClick={minusQuantities}>-</span>
                        <input type="text" value={quantities} readOnly/>
                        <span className="inc qtybtn" onClick={plusQuantities}>+</span>
                    </div>
                </div>
            </td>
            <td className="shoping__cart__total">
                \<span>{50 * quantities}</span>
            </td>
            <td className="shoping__cart__item__close">
                <span className="icon_close" onClick={close}></span>
            </td>
        </tr>
    );
}

export default CartProduct;