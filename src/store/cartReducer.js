import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart : [{id : 1, qty : 3}], // {id : pid, qty : 수량} 형식의 객체 모음
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addProduct(state, action) {
            let inCart = state.cart.find((product) => product.id === action.payload.id)
            if (inCart === undefined) {
                state.cart = [...state.cart, {id : action.payload.id, qty : 1}]
            }
            else {
                inCart.qty++
            }
        },
        minusProduct(state, action) {
            let inCart = state.cart.find((product) => product.id === action.payload.id)
                inCart.qty--
        },
        deleteProduct(state, action) {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id)
        },
        addProductWithQty(state, action) {
            let inCart = state.cart.find((product) => product.id === action.payload.id)
            if (inCart === undefined) {
                state.cart = [...state.cart, {id : action.payload.id, qty : action.payload.qty}]
            }
            else {
                inCart.qty += action.payload.qty
            }
        }
        }
})
console.log(initialState)
export const {addProduct, deleteProduct, minusProduct, addProductWithQty} = cartSlice.actions;
export default cartSlice.reducer


// const cartReducer = (state = init_state, action) => {
//     switch (action.type) {
//         case "ADD_PRODUCT" :
//             console.log("시작")
//             console.log(state.cart)
//             const inCart = state.cart.find((product) => product.id === action.payload.id)
//             if (inCart === undefined) {
//                 console.log("111")
//                 return [...state.cart, {id : action.payload.id, qty : 1}]
//             }
//             else {
//                 return state.cart.map((product) => {
//                     if (product.id === action.payload.id) {
//                         return [...state.cart, {id : action.payload.id, qty : product.qty + 1}]
//                     }
//                     else {
//                         return [...state.cart]
//                     }
//                 })
//             }
//             break
//         case "DELETE_PRODUCT" :
//             return {...state, cart: state.cart.filter((product) => product.id !== action.payload.id)}
//             break
//         case "DELETE_ALL" :
//             return {...state, cart : []}
//             break
//         case "PLUS_PRODUCT" :
//             const nowQty = state.cart.find((product) => product.id === action.payload.id).qty
//             return [...state.cart, {id : action.payload.id, qty : nowQty + 1}]
//             break
//         case "MINUS_PRODUCT" :
//             return [...state.cart, {id : action.payload.id, qty : nowQty + 1}]
//             break
//     }
// }

// export default cartReducer

