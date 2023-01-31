import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import $ from 'jquery'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addProductWithQty} from "../../store/cartSlice";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import styled from "styled-components";
import {setLogin} from "../../store/loginSlice";
import PreLoader from "../PreLoader/PreLoader";

const OriginPrice = styled.span`
  font-size: 25px;
  color: #1c1c1c;
  text-decoration: line-through;
  overflow: hidden;
`

const TextAreaH3 = styled.textarea`
  width: 100%;
  font-weight: 600;
  resize: none;
  overflow: hidden;
  border: none;
`
const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
  border: none;
`

const ModifyBtnDiv = styled.div`
  float: right;
`

function ProductDetails(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [quantities, setQuantities] = useState(1)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [params, setParams] = useSearchParams()
    const pid = params.get('pid')

    const userRole = useSelector(store => store.user.userRole)
    const plusQuantities = () => {
        setQuantities(quantities + 1)
    }
    const minusQuantities = () => {
        if (quantities > 1) {
            setQuantities(quantities - 1)
        }
    }

    const [product, setProduct] = useState({})
    const [fileNames, setfileNames] = useState([])
    const date = new Date(product.regDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const getProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://seol.site:9000/api/product/${pid}`)
            setProduct(response.data)
            setfileNames(response.data.fileNames)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }
    const addToCart = (e) => {
        e.preventDefault()
        dispatch(addProductWithQty({
            id: product.pid,
            name: product.name,
            price: product.price,
            fileNames: fileNames[0],
            qty: quantities
        }))
    }

    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false)
    const deleteConfirmModalClose = () => {
        setDeleteConfirmModalShow(false)
    }

    const [deleteFailureModalShow, setDeleteFailureModalShow] = useState(false)
    const deleteFailureModalClose = () => {
        setDeleteFailureModalShow(false)
    }


    const deleteProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`http://seol.site:9000/api/product/authentication/${pid}`)
            setIsLoading(false)
            navigate("/shop-grid")
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://seol.site:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return deleteProduct()
            }
            if (e.response.data.error === 'Forbidden') {
                setDeleteConfirmModalShow(false)
                setDeleteFailureModalShow(true)
            }
            setIsLoading(false)
        }
    }

    const stars = () => {
        let integer = Math.floor(product.reviewAvg)
        let decimal = product.reviewAvg - Math.floor(product.reviewAvg)
        if (decimal >= 0.5) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
        if (decimal !== 0 && decimal < 0.5) {
            $(".product__details__rating").prepend('<i class="fa fa-star-half-o"></i>')
        }
        for (let i = 0; i < integer; i++) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    const [carowsel, setCarowsel] = useState(false)
    const calcStock = () => {
        if (product.stock > 100) {
            return <span>재고 있음 (100개 이상)</span>
        } else if (product.stock > 10) {
            return <span>재고 있음 ({product.stock}개)</span>
        } else if (product.stock > 0) {
            return <span style={{color: 'red'}}>품절 임박 ({product.stock}개)</span>
        } else {
            return <span style={{color: 'red'}}>품절</span>
        }
    }

    const textareaH3 = useRef();
    const textareaP = useRef();

    useEffect(() => {
        stars()
        setCarowsel(!carowsel)
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [product])

    useEffect(() => {
        $('.product__details__pic__slider img').on('click', function () {
            var imgurl = $(this).data('imgbigurl');
            var bigImg = $('.product__details__pic__item--large').attr('src');
            if (imgurl != bigImg) {
                $('.product__details__pic__item--large').attr({
                    src: imgurl
                });
            }
        });
    }, [carowsel])


    return (
        <>

            <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                    <div className="product__details__pic__item">
                        <img
                            className="product__details__pic__item--large"
                            src={fileNames[0]}
                            alt=""
                        />
                    </div>
                    <ReactOwlCarousel margin={20} items={4} dots={true} smartSpeed={1200}
                                      className={"product__details__pic__slider"}>
                        {fileNames.map((img, index) => (
                            <img data-imgbigurl={img}
                                 src={img}
                                 key={index}
                                 alt=""/>
                        ))}
                    </ReactOwlCarousel>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <h3><TextAreaH3 name={"title"} rows={1} value={product.name} readOnly ref={textareaH3}></TextAreaH3>
                    </h3>
                    <div className="product__details__rating">
                        <span>{product.reviewAvg?.toFixed(1)}</span>
                        <span>({product.reviewCount} 개의 리뷰)</span>
                    </div>
                    {product.discount === true ? <h5 style={{color: '#dd2222'}}>{product.dcRatio}% 할인 중</h5> : ''}
                    <div className="product__details__price">{product.price}원 {product.discount === true ?
                        <OriginPrice>{product.originPrice}원</OriginPrice> : ''}</div>
                    <p>
                        <TextAreaP rows={1} value={product.text} readOnly ref={textareaP}/>
                    </p>
                    {product.stock > 0 ?
                        <>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <button><span className="dec detailqtybtn"
                                                      onClick={minusQuantities}>-</span>
                                        </button>
                                        <input type="text" value={quantities} readOnly/>
                                        <button><span className="inc detailqtybtn" onClick={plusQuantities}>+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <a href={"#"} className="primary-btn" onClick={addToCart}>장바구니에 담기</a>
                        </> : ''}
                    <ul>
                        <li><b>등록일</b>{year}년 {month}월 {day}일</li>
                        <li><b>원산지</b>{product.origin}</li>
                        <li><b>재고</b>{calcStock()}</li>
                        <li>
                            <b>배송기간</b>
                            <span>약 1~2일 </span>
                        </li>
                    </ul>
                    {userRole === "MANAGER" || userRole === "ADMIN"
                        ?
                        <ModifyBtnDiv>
                            <Button variant={"danger"} style={{marginBottom: '5px'}}
                                    onClick={() => setDeleteConfirmModalShow(true)}>삭제하기</Button>
                            <br/>
                            <Link to={`/shop-details-modify?pid=${pid}`}><Button
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
                    삭제 후 상품 목록으로 돌아갑니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
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

export default ProductDetails;