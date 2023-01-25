import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setLoginShow, setShow} from "../../store/loginSlice";
import {setJoinShow} from "../../store/joinSlice";

const JoinModal = () => {
    const showJoinModal = useSelector(store => store.join.showJoinModal)
    const dispatch = useDispatch()

    const [account, setAccount] = useState({
        id : '',
        pw : '',
        pw2 : '',
        phone : '',
        email : '',
        address : '',
    })

    const handleAccount = e => {
        setAccount({...account, [e.target.name] : e.target.value})
    }
    const setPhone = e => {
        if (!isNaN(e.target.value)) {
            setAccount({...account, phone : e.target.value})
        }
    }

    const handleClose = (e) => {
        dispatch(setJoinShow(false))
    }
    const checkAndSubmit = () => {

    }
    const goToLogin = () => {
        dispatch(setJoinShow(false))
        dispatch(setLoginShow(true))
    }
    const ref = useRef()

    useEffect(() => {
        ref.current?.focus()
    },[])

    return (
        <Modal show={showJoinModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>회원가입</Modal.Title>
                <Button variant="secondary" onClick={handleClose}>
                    X
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text" name={"id"} value={account.id} onChange={handleAccount}
                            ref={ref} autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password" name={"pw"} value={account.pw} onChange={handleAccount}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password" name={"pw2"} value={account.pw2} onChange={handleAccount}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email" name={"email"} value={account.email} onChange={handleAccount}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>연락처</Form.Label>
                        <Form.Control
                            type="tel" name={"phone"} value={account.phone} onChange={setPhone}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>주소</Form.Label>
                        <Form.Control
                            type="text" name={"address"} value={account.address} onChange={handleAccount}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer >
                <Button variant="secondary" style={{float: 'left'}} onClick={goToLogin}>
                    로그인으로
                </Button>
                <Button variant="primary" onClick={checkAndSubmit}>
                    가입하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default JoinModal;
