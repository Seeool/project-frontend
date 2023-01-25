import React from 'react';
import {Button, Col, Modal, Row, Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../store/cartSlice";

const CartModal = () => {
    const showCartModal = useSelector(store => store.cart.showCartModal)
    const dispatch = useDispatch()
    const handleClose = (e) => {
        dispatch(closeModal())
    }
    return (
        <Modal size="sm" centered show={showCartModal} onHide={handleClose} >
            <Modal.Body><h5>장바구니에 담았습니다</h5></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
