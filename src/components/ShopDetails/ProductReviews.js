import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import $ from "jquery";
import Review from "./Review";
import ReviewPagination from "./ReviewPagination";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {setLogin} from "../../store/loginSlice";
import styled from "styled-components";

const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
`

function ProductReviews(props) {

    const dispatch = useDispatch()
    const isLogin = useSelector(store => store.login.isLogin)
    const mid = useSelector(store => store.user.mid)
    const [params, setParams] = useSearchParams()
    const pid = params.get("pid")
    const [reviews, setReviews] = useState([]);

    const [size, setSize] = useState('6')
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()
    const [end, setEnd] = useState()
    const [start, setStart] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1);

    const scrollRef = useRef()

    const getReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/review/${pid}?page=${page}&size=${size}`)
            const data = response.data
            console.log(data)
            if (data.dtoList === null) {
                setReviews([])
            } else {
                setReviews(data.dtoList)
            }
            setPrev(data.prev)
            setNext(data.next)
            setEnd(data.end)
            setStart(data.start)
            setTotal(data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const movePage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        $(e.target).siblings().removeClass("active")
        $(e.target).addClass("active")
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
        setPage(e.target.innerHTML)
    }
    const nextPage = (e) => {
        e.stopPropagation()
        e.preventDefault()
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
        setPage(end + 1)
    }
    const prevPage = (e) => {
        e.stopPropagation()
        e.preventDefault()
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
        setPage(start - 1)
    }


    const starring = {
        size: 20,
        count: 5,
        value: 1,
        isHalf: false,
        emptyIcon: <i className="fa fa-star-o" style={{marginRight: '1px'}}/>,
        halfIcon: <i className="fa fa-star-half-o" style={{marginRight: '1px'}}/>,
        filledIcon: <i className="fa fa-star" style={{marginRight: '1px'}}/>,
        onChange: newValue => {
            setReviewForAdd({...reviewForAdd, grade: newValue})
            console.log(newValue)
            console.log(reviewForAdd.grade)
        }
    }

    const [addReviewModalShow, setAddReviewModalShow] = useState(false);
    const addReviewModalClose = () => setAddReviewModalShow(false);

    const [reviewForAdd, setReviewForAdd] = useState({
        pid: pid,
        mid: mid,
        text: '',
        grade: '1',
    })
    const textarea = useRef()
    const handleResizeHeightP = (e) => {
        setReviewForAdd({...reviewForAdd, [e.target.name]: e.target.value})
        textarea.current.style.height = 'auto'; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    };
    const createReview = async () => {
        try {
            const response = await axios.post(`http://localhost:9000/api/review/authentication/create`, reviewForAdd)
            setAddReviewModalShow(false)
            getReviews()
        } catch (e) {
            console.log(e)
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return createReview()
            }
            if (e.response.data.message === 'Forbidden') {
                // setCreateFailureModalShow(true)
            }
        }
    }

    useEffect(() => {
        getReviews()
    }, [page])

    useEffect(() => {
        setReviewForAdd({...reviewForAdd, mid: mid})
    }, [mid])

    return (
        <>
            <div ref={scrollRef} className="col-lg-12">
                <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            리뷰 ({total}건)
                        </li>
                    </ul>
                    <div className="tab-pane" id="tabs-3" role="tabpanel">
                        <div className="product__details__tab__desc">
                            {reviews.length > 0 ? reviews.map(review => (
                                <Review key={review.reviewNo} review={review} getReviews={getReviews}/>
                            )) : <h6 style={{textAlign: 'center'}}>리뷰가 없습니다</h6>}
                        </div>
                    </div>
                    {reviews.length > 0 ? <ReviewPagination start={start} page={page} end={end} prev={prev} next={next}
                                                            movePage={movePage} nextPage={nextPage} prevPage={prevPage}
                                                            reviews={reviews}/> : ''}
                </div>
                <br/>
                {isLogin
                ? <Button variant={"success"} onClick={() => setAddReviewModalShow(true)}>리뷰 작성</Button>
                : ''
                }

            </div>

            <Modal
                show={addReviewModalShow}
                onHide={addReviewModalClose}
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>리뷰 등록</Modal.Title>
                    <Button variant="secondary" onClick={addReviewModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type={"text"} name={"mid"} value={mid} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>별점</Form.Label>
                        <ReactStars {...starring} />
                    </Form.Group>
                    <Form.Group>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">본문</label>
                            <TextAreaP ref={textarea} name={"text"} className="form-control" value={reviewForAdd.text}
                                       onChange={handleResizeHeightP}></TextAreaP>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addReviewModalClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={createReview}>
                        등록하기
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    );
}


export default ProductReviews;