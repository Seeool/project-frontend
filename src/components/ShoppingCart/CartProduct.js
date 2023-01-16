import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery'

function CartProduct(props) {
    const {id, picUrl, name, price, quantity} = props.cartProduct
    const [quantities, setQuantities] = useState(quantity)

    const plusQuantities = () => {
        setQuantities(quantities + 1)
        props.setRenderChange(props.renderChange + 1)
    }
    const minusQuantities = () => {
        if(quantities > 0) {
            setQuantities(quantities - 1)
            props.setRenderChange(props.renderChange + 1)
        }
    }
    const close = () => {
        visibility.current.style.display = 'none'
        setQuantities(0)
        props.setRenderChange(props.renderChange + 1)
        // 쿠키에서도 삭제시키기
    }
    const visibility = useRef()

    return (
        <tr ref={visibility}>
            <td className="shoping__cart__item">
                <img src={picUrl} alt="" />
                    <h5>{name}</h5>
            </td>
            <td className="shoping__cart__price">
                \{price}
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
                \<span>{price * quantities}</span>
            </td>
            <td className="shoping__cart__item__close">
                <span className="icon_close" onClick={close}></span>
            </td>
        </tr>
    );
}

export default CartProduct;