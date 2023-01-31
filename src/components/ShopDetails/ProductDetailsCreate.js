import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {setLogin} from "../../store/loginSlice";
import styles from "../LoginModal/style.module.css";
import PreLoader from "../PreLoader/PreLoader";

const TextAreaH3 = styled.textarea`
  width: 100%;
  font-weight: 600;
  resize: none;
  overflow: hidden;
`
const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
`
const ModifyBtnDiv = styled.div`
  float: right;
`
const ImageRemoveBtn = styled.button`
  position: absolute;
  left: 225px;
`
function ProductDetails(props) {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [product, setProduct] = useState({
        pid: '',
        category: '',
        name: '',
        price: '',
        stock: '',
        salesVolume: '',
        origin: '',
        fileNames: [],
        discount: '',
        dcRatio: '',
        originPrice: '',
        text: '',
    })


    const handleValue = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }
    const discountCheck = (e) => {
        if (e.target.checked) {
            setProduct({...product, discount: true})
        } else {
            setProduct({...product, discount: false})
        }
    }
    const handleNumber = (e) => {
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name]: e.target.value})
        }
    }
    const handleDcRatio = (e) => {
        let discountPrice = Math.round((product.originPrice * (100 - e.target.value) / 100).toFixed(0) / 10) * 10
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name]: e.target.value, price: discountPrice})
        }
        if (e.target.value > 100) {
            setProduct({...product, [e.target.name]: 100, price: discountPrice})
        }
    }
    const handleOriginPrice = (e) => {
        let discountPrice = Math.round((e.target.value * (100 - product.dcRatio) / 100).toFixed(0) / 10) * 10
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name]: e.target.value, price: discountPrice})
        }
    }
    const setCategory = (e) => {
        setProduct({...product, category: e.target.value})
    }

    const [createSuccessModalShow, setCreateSuccessModalShow] = useState(false)
    const createSuccessModalClose = () => {
        setCreateSuccessModalShow(false)
        navigate(`/shop-details?pid=${product.pid}`)
    }

    const [createFailureModalShow, setCreateFailureModalShow] = useState(false)
    const createFailureModalClose = () => {
        setCreateFailureModalShow(false)
    }
    const [existFailureModalShow, setExistFailureModalShow] = useState(false)
    const existFailureModalClose = () => {
        setExistFailureModalShow(false)
    }
    const [imageUploadModalShow, setImageUploadModalShow] = useState(false)
    const imageUploadModalClose = () => {
        setImageUploadModalShow(false)
    }

    const createProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`http://seol.site:9000/api/product/authentication/create`, product)
            setProduct({...product, pid: response.data.pid}) // 리디렉트를 위한것
            setIsLoading(false)
            setCreateSuccessModalShow(true)
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://seol.site:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return createProduct()
            }
            if (e.response.data.error === 'Forbidden') {
                setCreateFailureModalShow(true)
            }
            if (e.response.data === "exist") {
                setExistFailureModalShow(true)
            }
            setIsLoading(false)
        }
    }

    const textareaH3 = useRef();
    const textareaP = useRef();
    const handleResizeHeightH3 = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
    };
    const handleResizeHeightP = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    };

    useEffect(() => {
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [product]);


    const [imageList, setImageList] = useState([])
    const uploadImage = async () => {
        const formObj = new FormData
        const fileInput = document.querySelector(".fileUploader")
        const files = fileInput.files
        for (let i = 0; i < files.length; i++) {
            formObj.append("files", files[i])
        }
        try {
            setIsLoading(true)
            const response = await axios({
                method: "post",
                url: "http://seol.site:9000/upload",
                data: formObj,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            let array = []
            for (const uploadResult of response.data) {
                array.push(uploadResult.link)
            }
            setImageList([...imageList, ...array])
            setIsLoading(false)
            setImageUploadModalShow(false)
        } catch (e) {
            if (e.message === "Network Error") {
                alert("1MB이하의 이미지를 업로드해주세요")
            } else {
                alert(e)
            }
            setIsLoading(false)
            setImageUploadModalShow(false)
        }
    }

    const deleteImage = async (obj) => {
        try {
            const response = await axios.delete(obj)
            let array = [...imageList]
            array = array.filter(fileName => fileName !== obj)
            setImageList(array)
        }catch (e) {
        }

    }

    useEffect(() => {
        setProduct({...product, fileNames: imageList})
    },[imageList])

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                    <h2>이미지 첨부</h2>
                    <Button variant={"primary"} onClick={() => setImageUploadModalShow(true)}>이미지 첨부</Button>
                    <br/>
                    {imageList.map((fileName, index) => (
                        <div key={index} style={{display: 'inline-block', position: 'relative'}}>
                            <ImageRemoveBtn onClick={() => deleteImage(fileName)}>X</ImageRemoveBtn>
                            <img src={fileName}
                                 alt=""
                                 style={{width: '250px', height: '250px', objectFit: 'cover'}}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                    <form>
                        상품명 : <h3><TextAreaH3 name={"name"} rows={1} ref={textareaH3} onChange={handleResizeHeightH3}
                                              value={product.name}></TextAreaH3></h3>
                        카테고리 : <select onChange={setCategory}>
                        <option value={"0"}>과일</option>
                        <option value={"1"}>정육/계란</option>
                        <option value={"2"}>밀키트</option>
                        <option value={"3"}>냉장/냉동/간편식</option>
                        <option value={"4"}>통조림/즉석밥/면</option>
                        <option value={"5"}>쌀/잡곡</option>
                        <option value={"6"}>베이커리</option>
                        <option value={"7"}>장/양념/소스</option>
                        <option value={"8"}>우유/유제품</option>
                        <option value={"9"}>채소</option>
                        <option value={"10"}>건강식품</option>
                    </select> <br/>
                        {/*상품 번호 : <input type={"text"} name={"pid"} value={product.pid} placeholder={"비우면 자동생성합니다"} onChange={handleNumber}/><br/>*/}
                        할인 : <input type={"checkbox"} name={"discount"} onChange={discountCheck}
                                    checked={product.discount}/>

                        {product.discount === true ?
                            <div>
                                할인율(%) : <input type={"text"} name={"dcRatio"} style={{width: '35px'}}
                                                value={product.dcRatio} onChange={handleDcRatio}/><br/>
                                원가 : <input type={"text"} name={"originPrice"} value={product.originPrice}
                                            onChange={handleOriginPrice} style={{width: '140px'}}/><br/>
                                가격 : <input type={"text"} name={"price"} value={product.price} readOnly
                                            style={{width: '140px'}}/>
                            </div>
                            :
                            <div>
                                <input type={"hidden"} value={product.price} style={{width: '140px'}}/>
                                가격 : <input type={"text"} name={"price"} value={product.price} onChange={handleNumber}
                                            style={{width: '140px'}}/>
                            </div>
                        }
                        <br/>
                        제품 설명
                        <TextAreaP rows={1} ref={textareaP} name={"text"} value={product.text}
                                   onChange={handleResizeHeightP}></TextAreaP>
                        <ul>
                            <li><b>원산지</b><input type={"text"} name={"origin"} onChange={handleValue}
                                                 value={product.origin} style={{width: '100px'}}/></li>
                            <li><b>재고</b><input type={"text"} name={"stock"} onChange={handleNumber}
                                                value={product.stock} style={{width: '100px'}}/></li>
                        </ul>
                    </form>
                    <ModifyBtnDiv>
                        <Button variant={"primary"} onClick={createProduct}>등록하기</Button>
                    </ModifyBtnDiv>
                </div>
            </div>

            <Modal
                show={imageUploadModalShow}
                onHide={imageUploadModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>이미지 등록</Modal.Title>
                    <Button variant="secondary" onClick={imageUploadModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control className={"fileUploader"} name={"fileNames"} type="file" accept='image/*'
                                      multiple/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={imageUploadModalClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={uploadImage}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={createSuccessModalShow}
                onHide={createSuccessModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>등록 성공</Modal.Title>
                    <Button variant="secondary" onClick={createSuccessModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    등록되었습니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={createSuccessModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={createFailureModalShow}
                onHide={createFailureModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>등록 실패</Modal.Title>
                    <Button variant="secondary" onClick={createFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ADMIN만 등록 가능
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={createFailureModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={existFailureModalShow}
                onHide={existFailureModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>등록 실패</Modal.Title>
                    <Button variant="secondary" onClick={existFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    상품 번호가 중복됩니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={existFailureModalClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            {isLoading ? <PreLoader/> : ''}
        </>
    )
        ;
}

export default ProductDetails;