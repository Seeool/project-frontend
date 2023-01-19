import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery'
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {addProduct, deleteProduct, minusProduct} from "../../store/cartSlice";
import {Link} from "react-router-dom";

function CartProduct(props) {
    const {id, name, price, qty, fileNames} = props.cartProduct
    const dispatch = useDispatch()

    console.log("파일이름 확인하기"+fileNames)

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

    const close = () => {
        dispatch(deleteProduct({id: id}))
        props.setRenderChange(props.renderChange + 1)
    }

    return (
        <tr>
            <td className="shoping__cart__item">
                <Link to={`/shop-details?pid=${id}`}>
                    <img src={fileNames} alt=""/>
                    <h5>{name}</h5>
                </Link>
            </td>
            <td className="shoping__cart__price">
                \{price}
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
                \<span>{price * qty}</span>
            </td>
            <td className="shoping__cart__item__close">
                <span className="icon_close" onClick={close}></span>
            </td>
        </tr>
    );
}

export default CartProduct;