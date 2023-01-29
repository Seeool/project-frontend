import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {setLogin} from "../../store/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import PreLoader from "../PreLoader/PreLoader";

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 16px;
  color: #6f6f6f;
  overflow: hidden;
`
const TextAreaH3 = styled.textarea`
  width: 100%;
  font-weight: 600;
  border: none;
  resize: none;
  overflow: hidden;
`

const ModifyBtnDiv = styled.div`
  float: right;
`
function BlogSection(props) {
    const [isLoading, setIsLoading] = useState(false)
    const {title, text, fileName, mid, memberFileName, roleSet, category, bid} = props.blog
    const categories = ["뷰티", "음식", "생활/건강", "여행"]
    let role
    if (roleSet.includes("USER")) {
        role = "USER"
    }
    if (roleSet.includes("MANAGER")) {
        role = "MANAGER"
    }
    if (roleSet.includes("ADMIN")) {
        role = "ADMIN"
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRole = useSelector(store => store.user.userRole)

    const textareaH3 = useRef();
    const textareaP = useRef();
    useEffect(() => {
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [props.blog])

    const deleteBlog = async () => {
        try {
            setIsLoading(true)
            await axios.post("http://seol.site:9000/api/blog/authentication/delete", props.blog)
            setDeleteConfirmModalShow(false)
            setIsLoading(false)
            navigate('/blog')
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://seol.site:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return deleteBlog()
            }
            if (e.response.data.error === 'Forbidden') {
                setDeleteConfirmModalShow(false)
                setDeleteFailureModalShow(true)
            }
            setIsLoading(false)
        }
    }

    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false)
    const deleteConfirmModalClose = () => {
        setDeleteConfirmModalShow(false)
    }

    const [deleteFailureModalShow, setDeleteFailureModalShow] = useState(false)
    const deleteFailureModalClose = () => {
        setDeleteFailureModalShow(false)
    }

    return (
        <>
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
                <div className="blog__details__text">
                    <img src={fileName} alt=""/>
                    <h3><TextAreaH3 rows={1} name={"title"} ref={textareaH3} value={title} readOnly /></h3>
                    <StyledTextarea rows={1} name={"text"} ref={textareaP} value={text} readOnly ></StyledTextarea>

                </div>
                <div className="blog__details__content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="blog__details__author">
                                <div className="blog__details__author__pic">
                                    <img src={memberFileName} alt=""/>
                                </div>
                                <div className="blog__details__author__text">
                                    <h6>{mid}</h6>
                                    <span>{role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{display: "flex", alignItems: 'center'}}>
                            <div className="blog__details__widget">
                                <ul>
                                    <li><span>카테고리:</span> {categories[category]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {userRole === "MANAGER" || userRole === "ADMIN"
                        ?
                        <ModifyBtnDiv>
                            <Button variant={"danger"} style={{marginBottom: '5px'}}
                                    onClick={() => setDeleteConfirmModalShow(true)}>삭제하기</Button>
                            <br/>
                            <Link to={`/blog-details-modify?bid=${bid}`}><Button
                                variant={"primary"}>수정하기</Button></Link>
                        </ModifyBtnDiv>
                        : ''
                    }
                </div>
            </div>

            <Modal
                show={deleteConfirmModalShow}
                onHide={deleteConfirmModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>삭제하시겠습니까?</Modal.Title>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    목록으로 돌아갑니다
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={deleteBlog}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={deleteFailureModalShow}
                onHide={deleteFailureModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>삭제 실패</Modal.Title>
                    <Button variant="secondary" onClick={deleteFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ADMIN만 삭제 가능
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteFailureModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            {isLoading ? <PreLoader/> : ''}
        </>
    );
}

export default BlogSection;