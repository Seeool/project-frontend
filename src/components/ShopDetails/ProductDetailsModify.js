import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import $ from 'jquery'
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProductWithQty} from "../../store/cartSlice";
import {Link, useSearchParams} from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import styled from "styled-components";

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
  //border: none;
`
const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
  //border: none;
`
const ModifyBtnDiv = styled.div`
  float: right;
`

function ProductDetails(props) {
    const [quantities, setQuantities] = useState(1)
    const dispatch = useDispatch()
    // const params = new URLSearchParams(useLocation().search)
    const [params, setParams] = useSearchParams()
    const pid = params.get('pid')
    const plusQuantities = () => {
        setQuantities(quantities + 1)
    }
    const minusQuantities = () => {
        if (quantities > 0) {
            setQuantities(quantities - 1)
        }
    }

    const [product, setProduct] = useState({})
    const [fileNames, setfileNames] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState(0)
    const [text, setText] = useState('')
    const [discount, setDiscount] = useState(0)
    const [dcRatio, setDcRatio] = useState(0)
    const [originPrice, setOriginPrice] = useState(0)
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [origin, setOrigin] = useState('')
    const [imageSet, setImageSet] = useState([])
    const [reviewAvg, setReviewAvg] = useState(0)
    const [reviewCount, setReviewCount] = useState(0)


    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/product/${pid}`)
            console.log(response.data)
            console.log(response.data.fileNames)
            const data = response.data
            setProduct(data)
            setName(data.name)
            setCategory(data.category)
            setPrice(data.price)
            setStock(data.stock)
            setOrigin(data.origin)
            setfileNames(data.fileNames)
            setDiscount(data.discount)
            setDcRatio(data.dcRatio)
            setOriginPrice(data.originPrice)
            setText(data.text)
            setReviewAvg(data.reviewAvg)
            setReviewCount(data.reviewCount)
        } catch (e) {
            alert(e)
        }
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        dispatch(addProductWithQty({
            id: product.pid,
            name: product.name,
            price: product.price,
            fileNames: fileNames[0],
            qty: quantities
        }))
        setShow(true);
    }
    const stars = () => {
        let integer = Math.floor(product.reviewAvg)
        let decimal = product.reviewAvg - Math.floor(product.reviewAvg)
        if (decimal >= 0.5) {
            $(".product__details__rating").prepend('<i class="fa fa-star"></i>')
        }
        if (decimal < 0.5) {
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
    useEffect(() => {
        stars()
        setCarowsel(!carowsel)
    }, [product])

    const textareaH3 = useRef();
    const textareaP = useRef();
    const handleResizeHeightH3 = () => {
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
    };
    const handleResizeHeightP = () => {
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    };

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
                    {/*<div className="product__details__pic__item">*/}
                    {/*    <img*/}
                    {/*        className="product__details__pic__item--large"*/}
                    {/*        src={fileNames[0]}*/}
                    {/*        alt=""*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<ReactOwlCarousel margin={20} items={4} dots={true} smartSpeed={1200}*/}
                    {/*                  className={"product__details__pic__slider"}>*/}
                    <h2>이미지 첨부</h2>
                    <input type={"file"} name={"fileNames"} multiple/>
                    {fileNames.map((img, index) => (
                        <img src={img}
                             key={index}
                             alt=""
                             style={{width: '250px'}}
                        />
                    ))}
                    {/*</ReactOwlCarousel>*/}
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <form>
                        {/*<h3>{product.name}</h3>*/}
                        <h3><TextAreaH3 name={"name"} rows={1} ref={textareaH3} onChange={handleResizeHeightH3}
                                        value={name}></TextAreaH3></h3>
                        {/*<div className="product__details__rating">*/}
                        {/*    <span>{reviewAvg?.toFixed(1)}</span>*/}
                        {/*    <span>({reviewCount} 개의 리뷰)</span>*/}
                        {/*</div>*/}
                        {/*{discount === true ? <h5 style={{color: '#dd2222'}}>{dcRatio}% 할인 중</h5> : ''}*/}
                        할인 : <input type={"checkbox"} value={1} name={"discount"} checked={discount}/> / 할인율(%) : <input
                        type={"text"} name={"dcRatio"} style={{width: '30px'}} value={dcRatio}/>

                        {/*<div className="product__details__price">{price}원 {discount === true ?*/}
                        {/*    <OriginPrice>{originPrice}원</OriginPrice> : ''}</div>*/}

                        {discount === true ?
                            <div>
                                원가 : <input type={"text"} defaultValue={originPrice} style={{width: '140px'}}/><br/>
                                가격 : <input type={"text"} defaultValue={price} style={{width: '140px'}}/>
                            </div>
                            :
                            <div>
                                <input type={"hidden"} value={price} style={{width: '140px'}}/>
                                가격 : <input type={"text"} value={price} style={{width: '140px'}}/>
                            </div>
                        }
                        <br/>
                        제품 설명
                        <p>
                            <TextAreaP rows={1} ref={textareaP} value={text} onChange={handleResizeHeightP}></TextAreaP>
                        </p>
                        {/*{stock > 0 ?*/}
                        {/*    <>*/}
                        {/*        <div className="product__details__quantity">*/}
                        {/*            <div className="quantity">*/}
                        {/*                <div className="pro-qty">*/}
                        {/*                    <button><span className="dec detailqtybtn"*/}
                        {/*                                  onClick={minusQuantities}>-</span>*/}
                        {/*                    </button>*/}
                        {/*                    <input type="text" value={quantities} readOnly/>*/}
                        {/*                    <button><span className="inc detailqtybtn" onClick={plusQuantities}>+</span>*/}
                        {/*                    </button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <a href={"#"} className="primary-btn" onClick={handleShow}>장바구니에 담기</a>*/}
                        {/*    </> : ''}*/}
                        <ul>
                            <li><b>원산지</b><input type={"text"} value={origin} style={{width: '100px'}}/></li>
                            <li><b>재고</b><input type={"text"} value={stock} style={{width: '100px'}}/></li>
                            <li>
                                <b>배송기간</b>
                                <span>약 1~2일 </span>
                            </li>

                        </ul>
                    </form>
                    <ModifyBtnDiv>
                        <Link to={`/shop-details?pid=${pid}`} ><Button variant={"secondary"} style={{marginBottom : '5px'}}>이전으로</Button></Link>
                        <br />
                        <Button variant={"danger"} style={{marginBottom : '5px'}}>삭제하기</Button>
                        <br />
                        <Button variant={"primary"}>수정완료</Button>
                    </ModifyBtnDiv>
                </div>
            </div>

            <Modal size="sm" centered show={show} onHide={handleClose}>
                <Modal.Body><h5>장바구니에 담았습니다</h5></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}

export default ProductDetails;