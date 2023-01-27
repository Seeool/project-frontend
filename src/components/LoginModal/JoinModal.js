import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setLoginShow, setShow} from "../../store/loginSlice";
import {setJoinShow} from "../../store/joinSlice";
import styled from "styled-components";
import styles from "./style.module.css"
import axios from "axios";

const ErrorSpan = styled.span`
  color: darkred;
  font-size: 12px;
  display: none;
`

const JoinModal = () => {
    const showJoinModal = useSelector(store => store.join.showJoinModal)
    const dispatch = useDispatch()
    const [joinFailure, setJoinFailure] = useState(false)

    const [joinFailModalShow, setJoinFailModalShow] = useState(false);
    const joinFailModalClose = () => setJoinFailModalShow(false);

    const [joinSuccessModalShow, setJoinSuccessModalShow] = useState(false);
    const joinSuccessModalClose = () => setJoinSuccessModalShow(false);

    const [account, setAccount] = useState({
        mid: '',
        pw: '',
        pw2: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    })
    const idRef = useRef()
    const idRef2 = useRef()
    const pwRef = useRef()
    const pw2Ref = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()
    const handleAccount = e => {
        setAccount({...account, [e.target.name]: e.target.value})
    }
    const setPhone = e => {
        if (!isNaN(e.target.value)) {
            setAccount({...account, phone: e.target.value})
        }
    }

    const handleClose = (e) => {
        dispatch(setJoinShow(false))
        setJoinFailure(false)
    }
    const goToLogin = () => {
        dispatch(setJoinShow(false))
        dispatch(setLoginShow(true))
        setJoinFailure(false)
    }

    const joinForm = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:9000/memberJoin", account)
            setJoinSuccessModalShow(true)
            handleClose()
        } catch (e) {
            if (e.response.data === "exist") {
                idRef2.current.classList.add(styles.active)
                setJoinFailure(true)
                setJoinFailModalShow(true)
            }
        }
    }

    const checkForm = () => {
        let check = true
        if (account.mid.length < 7) {
            idRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.pw.length < 8) {
            pwRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.pw !== account.pw2) {
            pw2Ref.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.name === '') {
            nameRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.email === '') {
            emailRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.phone === '') {
            phoneRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (account.address === '') {
            addressRef.current.classList.add(styles.active)
            setJoinFailure(true)
            check = false
        }
        if (check) {
            joinForm()
        }
    }

    useEffect(() => {
        if (joinFailure) {
            if (account.mid.length < 7) {
                idRef.current.classList.add(styles.active)
            }
            if (account.pw.length < 8) {
                pwRef.current.classList.add(styles.active)
            }
            if (account.pw !== account.pw2) {
                pw2Ref.current.classList.add(styles.active)
            }
            if (account.name === '') {
                nameRef.current.classList.add(styles.active)
            }
            if (account.email === '') {
                emailRef.current.classList.add(styles.active)
            }
            if (account.phone === '') {
                phoneRef.current.classList.add(styles.active)
            }
            if (account.address === '') {
                addressRef.current.classList.add(styles.active)
            }
            if (account.mid.length >= 7) {
                idRef?.current?.classList.remove(styles.active)
            }
            if (account.pw.length >= 8) {
                pwRef?.current?.classList.remove(styles.active)
            }
            if (account.pw === account.pw2) {
                pw2Ref?.current?.classList.remove(styles.active)
            }
            if (account.name !== '') {
                nameRef?.current?.classList.remove(styles.active)
            }
            if (account.email !== '') {
                emailRef?.current?.classList.remove(styles.active)
            }
            if (account.phone !== '') {
                phoneRef?.current?.classList.remove(styles.active)
            }
            if (account.address !== '') {
                addressRef?.current?.classList.remove(styles.active)
            }
        }
    }, [account])

    return (
        <>
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
                            <Form.Label>아이디 <span className={styles.joinForm} ref={idRef}>아이디는 7자 이상입니다</span>
                                <span className={styles.joinForm} ref={idRef2}>이미 존재하는 아이디입니다.</span></Form.Label>
                            <Form.Control
                                type="text" name={"mid"} value={account.mid} onChange={handleAccount}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호 <span className={styles.joinForm}
                                                   ref={pwRef}>비밀번호는 8자 이상입니다</span></Form.Label>
                            <Form.Control
                                type="password" name={"pw"} value={account.pw} onChange={handleAccount}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호 확인 <span className={styles.joinForm}
                                                      ref={pw2Ref}>비밀번호가 일치하지 않습니다</span></Form.Label>
                            <Form.Control
                                type="password" name={"pw2"} value={account.pw2} onChange={handleAccount}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>이름 <span className={styles.joinForm}
                                                 ref={nameRef}>이름을 입력해주세요</span></Form.Label>
                            <Form.Control
                                type="text" name={"name"} value={account.name} onChange={handleAccount}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>이메일 <span className={styles.joinForm}
                                                  ref={emailRef}>이메일을 입력해주세요</span></Form.Label>
                            <Form.Control
                                type="email" name={"email"} value={account.email} onChange={handleAccount}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>연락처 <span className={styles.joinForm}
                                                  ref={phoneRef}>연락처를 입력해주세요</span></Form.Label>
                            <Form.Control
                                type="tel" name={"phone"} value={account.phone} onChange={setPhone}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>주소 <span className={styles.joinForm}
                                                 ref={addressRef}>주소를 입력해주세요</span></Form.Label>
                            <Form.Control
                                type="text" name={"address"} value={account.address} onChange={handleAccount}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{float: 'left'}} onClick={goToLogin}>
                        로그인으로
                    </Button>
                    <Button variant="primary" onClick={checkForm}>
                        가입하기
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal
                show={joinFailModalShow}
                onHide={joinFailModalClose}
                backdrop="static"
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>회원가입 실패</Modal.Title>
                    <Button variant="secondary" onClick={joinFailModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    이미 존재하는 아이디입니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={joinFailModalClose}>
                       닫기
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={joinSuccessModalShow}
                onHide={joinSuccessModalClose}
                backdrop="static"
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>회원가입 성공</Modal.Title>
                    <Button variant="secondary" onClick={joinSuccessModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    회원이 되신 것을 환영합니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={joinSuccessModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default JoinModal;
