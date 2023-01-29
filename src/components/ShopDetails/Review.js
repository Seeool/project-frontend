import React, {useEffect, useRef, useState} from 'react';
import $ from "jquery";
import styled from "styled-components";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setLogin} from "../../store/loginSlice";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
  border: none;
`
const Review = (props) => {
    const {review, getReviews} = props
    const textareaP = useRef()
    const loginId = useSelector(store => store.user.mid)
    const userRole = useSelector(store => store.user.userRole)
    const dispatch = useDispatch()

    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false)
    const deleteConfirmModalClose = () => {
        setDeleteConfirmModalShow(false)
    }
    const deleteReview = async () => {
        try {
            console.log(review)
            const response = await axios.post(`http://localhost:9000/api/review/authentication/delete`, review)
            getReviews()
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return deleteReview()
            }
            if (e.response.data.message === 'Forbidden') {
                alert(e)
            }
        }
    }

    useEffect(() => {
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [])
    return (
        <>
            <div>
                <HeaderDiv>
                    <h6>{review.mid} <i className="fa fa-star" style={{color: '#EDBB0E'}}></i>{review.grade}</h6>
                    {userRole === "ADMIN" || loginId === review.mid
                        ? <Button variant={"secondary"} onClick={()=>setDeleteConfirmModalShow(true)}>X</Button>
                        : ''
                    }
                </HeaderDiv>
                <p><TextAreaP rows={1} ref={textareaP} value={review.text} readOnly></TextAreaP></p>
                <hr/>
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={deleteReview}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Review;