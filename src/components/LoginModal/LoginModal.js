import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../store/cartSlice";
import styled from "styled-components";
import {setLogin, setLoginShow} from "../../store/loginSlice";
import {setJoinShow} from "../../store/joinSlice";
import axios from "axios";
import {setAccount} from "../../store/userSlice";
import {
    GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI,
    KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI,
    NAVER_CALLBACK_URL,
    NAVER_CLIENT_ID
} from "../../data/SocialLoginData";
import PreLoader from "../PreLoader/PreLoader";

const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LoginModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const showLoginModal = useSelector(store => store.login.showLoginModal)
    const token = useSelector(store => store.login.accessToken)

    const [loginFailModalShow, setLoginFailModalShow] = useState(false);
    const loginFailModalClose = () => setLoginFailModalShow(false);

    const dispatch = useDispatch()
    const handleClose = (e) => {
        dispatch(setLoginShow(false))
    }
    const goToJoin = (e) => {
        dispatch(setLoginShow(false))
        dispatch(setJoinShow(true))
    }
    const [loginInfo, setLoginInfo] = useState({
        mid: '',
        pw: ''
    })
    const handleAccount = e => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    }

    const enterPress = e => {
        if (e.key === 'Enter') {
            login()
        }
    };

    const login = async () => {
        try {
            setIsLoading(true)
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:9000/loginProc", loginInfo)
            const accessToken = response.data.accessToken;
            axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
            dispatch(setLogin(accessToken))

            const account = await axios.get("http://localhost:9000/api/member/me", )
            dispatch(setAccount(account.data))
            setLoginInfo({})
            setIsLoading(false)

        } catch (err) {
            if (err.response.data.error === "BadCredentials") {
                setLoginFailModalShow(true)
            }
            setIsLoading(false)
        }
    }

    return (
        <>
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
                                name={"mid"}
                                value={loginInfo.id}
                                onChange={handleAccount}
                                onKeyDown={enterPress}
                                autoComplete={'off'}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                name={"pw"}
                                value={loginInfo.pw}
                                onKeyDown={enterPress}
                                autoComplete={'off'}
                                onChange={handleAccount}
                            />
                        </Form.Group>
                    </Form>
                    <DivFlex>
                        <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${NAVER_CALLBACK_URL}`}><img src={"/img/socialLogin/naver.png"} style={{width: '230px', height: '58px'}}/></a>
                        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}><img src={"/img/socialLogin/kakao.png"} style={{width: '230px', height: '58px'}}/></a>
                        <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}><img src={"/img/socialLogin/google.png"}
                                           style={{width: '230px', height: '58px'}}/></a>
                    </DivFlex>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{float: 'left'}} onClick={goToJoin}>
                        회원가입
                    </Button>
                    <Button variant="primary" onClick={login}>
                        로그인
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={loginFailModalShow}
                onHide={loginFailModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>로그인 실패</Modal.Title>
                    <Button variant="secondary" onClick={loginFailModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    아이디 혹은 비밀번호를 확인해주세요.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={loginFailModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            {isLoading ? <PreLoader/> : ''}
        </>
    );
};

export default LoginModal;
