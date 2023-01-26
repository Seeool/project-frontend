import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../store/cartSlice";
import styled from "styled-components";
import {setAccessToken, setIsLogin, setLoginShow} from "../../store/loginSlice";
import {setJoinShow} from "../../store/joinSlice";
import axios from "axios";

const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LoginModal = () => {
    const showLoginModal = useSelector(store => store.login.showLoginModal)
    const token = useSelector(store => store.login)

    const dispatch = useDispatch()
    const handleClose = (e) => {
        dispatch(setLoginShow(false))
    }
    const goToJoin = (e) => {
        dispatch(setLoginShow(false))
        dispatch(setJoinShow(true))
    }
    const [account, setAccount] = useState({
        id : '',
        pw : ''
    })
    const handleAccount = e => {
        setAccount({...account, [e.target.name] : e.target.value})
    }

    const login = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:9000/loginProc", account)
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
            dispatch(setAccessToken(accessToken), setLoginShow(false), setIsLogin(true))

        }catch (err)  {
            console.log(err.response.data)
            if (err.response.data.error === "BadCredentials") {
                alert("아이디 혹은 비밀번호를 확인해주세요")
            }
        }
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
                            name={"id"}
                            value={account.id}
                            onChange={handleAccount}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            name={"pw"}
                            value={account.pw}
                            onChange={handleAccount}
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
                <Button variant="primary" onClick={login}>
                    로그인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
