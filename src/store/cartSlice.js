import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart : [], // {id : pid, qty : 수량} 형식의 객체 모음
}

const cartSlice = createSlice({
    name : 'sliceName',
    initialState,
    reducers : {
        addProduct(state, action) {
            let inCart = state.cart.find((product) => product.id === action.payload.id)
            if (inCart === undefined) {
                state.cart = [...state.cart, {id : action.payload.id, name : action.payload.name, price : action.payload.price, qty : 1, fileNames : action.payload.fileNames}]
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
                state.cart = [...state.cart, {id : action.payload.id, name : action.payload.name, price : action.payload.price, qty : action.payload.qty, fileNames : action.payload.fileNames}]
            }
            else {
                inCart.qty += action.payload.qty
            }
        }
        }
})
export const {addProduct, deleteProduct, minusProduct, addProductWithQty} = cartSlice.actions;
export default cartSlice

