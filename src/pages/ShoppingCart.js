import React, {useEffect} from 'react';
import CartSection from "../components/ShoppingCart/CartSection";
import appendScript from "../appendScript";

function ShoppingCart(props) {
    return (
        <section className="shoping-cart spad">
            <div className="container">
                <CartSection/>

            </div>
        </section>

    );
}

export default ShoppingCart;