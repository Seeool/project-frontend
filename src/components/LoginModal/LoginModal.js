import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../store/cartSlice";
import styled from "styled-components";
import {setLoginShow} from "../../store/loginSlice";
import {setJoinShow} from "../../store/joinSlice";

const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LoginModal = () => {
    const showLoginModal = useSelector(store => store.login.showLoginModal)
    const dispatch = useDispatch()
    const handleClose = (e) => {
        dispatch(setLoginShow(false))
    }
    const goToJoin = (e) => {
        dispatch(setLoginShow(false))
        dispatch(setJoinShow(true))
    }
    return (
        <Modal show={showLoginModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>로그인</Modal.Title>
                <Button variant="secondary" onClick={handleClose}>
                    X
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                        />
                    </Form.Group>
                </Form>
                <DivFlex>
                    <a href={"#"}><img src={"/img/socialLogin/naver.png"} style={{width: '230px', height: '58px'}} /></a>
                    <a href={"#"}><img src={"/img/socialLogin/kakao.png"} style={{width: '230px', height: '58px'}} /></a>
                    <a href={"#"}><img src={"/img/socialLogin/google.png"} style={{width: '230px', height: '58px'}} /></a>
                </DivFlex>

            </Modal.Body>
            <Modal.Footer >
                <Button variant="secondary" style={{float: 'left'}} onClick={goToJoin}>
                    회원가입
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    로그인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
