import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {setLogin} from "../../store/loginSlice";
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

    const [params, setParams] = useSearchParams()
    const pid = params.get('pid')


    const [product, setProduct] = useState({
        pid : '',
        category : '',
        name : '',
        price : '',
        stock : '',
        salesVolume : '',
        origin : '',
        fileNames : [],
        discount : '',
        dcRatio : '',
        originPrice : '',
        text : '',
    })

    const getProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://seol.site:9000/api/product/${pid}`)
            const data = response.data
            setProduct(data)
            setProduct({...data, fileNames: []})
            setImageList([...imageList, ...data.fileNames])
            if (data.fileNames.filter(file => file !== '/img/noImage.jpg').length === 0) {
                setImageList([])
            }
            setIsLoading(false)
        } catch (e) {
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const textareaH3 = useRef();
    const textareaP = useRef();
    const handleResizeHeightH3 = (e) => {
        setProduct({...product, [e.target.name] : e.target.value})
        textareaH3.current.style.height = 'auto'; //height ?????????
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
    };
    const handleResizeHeightP = (e) => {
        setProduct({...product, [e.target.name] : e.target.value})
        textareaP.current.style.height = 'auto'; //height ?????????
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    };
    const handleValue = (e) => {
        setProduct({...product, [e.target.name] : e.target.value})
    }
    const discountCheck = (e) => {
        if (e.target.checked) {
            setProduct({...product, discount : true})
        }
        else {
            setProduct({...product, discount : false})
        }
    }
    const handleNumber = (e) => {
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name] : e.target.value})
        }
    }
    const handleDcRatio = (e) => {
        let discountPrice = Math.round((product.originPrice * (100 - e.target.value) / 100).toFixed(0) / 10)  * 10
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name] : e.target.value, price : discountPrice})
        }
        if (e.target.value > 100) {
            setProduct({...product, [e.target.name] : 100 , price : discountPrice})
        }
    }
    const handleOriginPrice = (e) => {
        let discountPrice = Math.round((e.target.value * (100 - product.dcRatio) / 100).toFixed(0) / 10)  * 10
        if (!isNaN(e.target.value)) {
            setProduct({...product, [e.target.name] : e.target.value, price : discountPrice})
        }
    }
    const setCategory = (e) => {
        setProduct({...product, category: e.target.value})
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
        }catch (e) {
            if(e.response.data.msg === 'Expired Token') {
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

    const [modifySuccessModalShow, setModifySuccessModalShow] = useState(false)
    const modifySuccessModalClose = () => {
        setModifySuccessModalShow(false)
        navigate(`/shop-details?pid=${product.pid}`)
    }

    const [modifyFailureModalShow, setModifyFailureModalShow] = useState(false)
    const modifyFailureModalClose = () => {
        setModifyFailureModalShow(false)
    }

    const [imageUploadModalShow, setImageUploadModalShow] = useState(false)
    const imageUploadModalClose = () => {
        setImageUploadModalShow(false)
    }

    const modifyProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.put(`http://seol.site:9000/api/product/authentication/${pid}`, product)
            setIsLoading(false)
            setModifySuccessModalShow(true)
        }catch (e) {
            if(e.response?.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://seol.site:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return modifyProduct()
            }
            if (e.response?.data.error === 'Forbidden') {
                setModifyFailureModalShow(true)
            }
            setIsLoading(false)
        }
        finally {
            for (const deletedImage of imageDeleteList) {
                await axios.delete(deletedImage)
            }
        }
    }

    useEffect(() => {
        textareaH3.current.style.height = 'auto'; //height ?????????
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
        textareaP.current.style.height = 'auto'; //height ?????????
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [product]);

    const [imageList, setImageList] = useState([])
    const [imageDeleteList, setImageDeleteList] = useState([])
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
                alert("1MB????????? ???????????? ?????????????????????")
            } else {
                alert(e)
            }
            setIsLoading(false)
            setImageUploadModalShow(false)
        }
    }

    const deleteImage = async (obj) => {
        setImageDeleteList([...imageDeleteList, obj])
        let array = [...imageList]
        array = array.filter(fileName => fileName !== obj)
        setImageList(array)
    }

    useEffect(() => {
        setProduct({...product, fileNames: imageList})
    },[imageList])

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                    <h2>????????? ??????</h2>
                    <Button variant={"primary"} onClick={() => setImageUploadModalShow(true)}>????????? ??????</Button>
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
                        ????????? :
                        <h3><TextAreaH3 name={"name"} rows={1} ref={textareaH3} onChange={handleResizeHeightH3}
                                        value={product.name}></TextAreaH3></h3>
                        ?????? ?????? : <input type={"text"} value={product.pid} readOnly style={{border : 'none'}}></input><br/>
                        ???????????? : <select onChange={setCategory}>
                        <option value={"0"}>??????</option>
                        <option value={"1"}>??????/??????</option>
                        <option value={"2"}>?????????</option>
                        <option value={"3"}>??????/??????/?????????</option>
                        <option value={"4"}>?????????/?????????/???</option>
                        <option value={"5"}>???/??????</option>
                        <option value={"6"}>????????????</option>
                        <option value={"7"}>???/??????/??????</option>
                        <option value={"8"}>??????/?????????</option>
                        <option value={"9"}>??????</option>
                        <option value={"10"}>????????????</option>
                    </select> <br/>
                        ?????? : <input type={"checkbox"} name={"discount"} onChange={discountCheck} checked={product.discount} />

                        {product.discount === true ?
                            <div>
                                ?????????(%) : <input type={"text"} name={"dcRatio"} style={{width: '35px'}} value={product.dcRatio} onChange={handleDcRatio} /><br/>
                                ?????? : <input type={"text"} name={"originPrice"} value={product.originPrice} onChange={handleOriginPrice} style={{width: '140px'}}/><br/>
                                ?????? : <input type={"text"} name={"price"} value={product.price} readOnly style={{width: '140px'}}/>
                            </div>
                            :
                            <div>
                                <input type={"hidden"} value={product.price} style={{width: '140px'}}/>
                                ?????? : <input type={"text"} name={"price"} value={product.price} onChange={handleNumber} style={{width: '140px'}}/>
                            </div>
                        }
                        <br/>
                        ?????? ??????
                        <TextAreaP rows={1} ref={textareaP} name={"text"} value={product.text} onChange={handleResizeHeightP}></TextAreaP>
                        <ul>
                            <li><b>?????????</b><input type={"text"} name={"origin"} onChange={handleValue} value={product.origin} style={{width: '100px'}}/></li>
                            <li><b>??????</b><input type={"text"} name={"stock"} onChange={handleNumber} value={product.stock} style={{width: '100px'}}/></li>
                        </ul>
                    </form>
                    <ModifyBtnDiv>
                        <Link to={`/shop-details?pid=${pid}`} ><Button variant={"secondary"} style={{marginBottom : '5px'}}>????????????</Button></Link>
                        <br />
                        <Button variant={"danger"} style={{marginBottom : '5px'}} onClick={() => setDeleteConfirmModalShow(true)}>????????????</Button>
                        <br />
                        <Button variant={"primary"} onClick={modifyProduct}>????????????</Button>
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
                    <Modal.Title>????????? ??????</Modal.Title>
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
                        ??????
                    </Button>
                    <Button variant="primary" onClick={uploadImage}>
                        ??????
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={modifySuccessModalShow}
                onHide={modifySuccessModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>?????? ??????</Modal.Title>
                    <Button variant="secondary" onClick={modifySuccessModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ?????????????????????.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifySuccessModalClose}>
                        ??????
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={modifyFailureModalShow}
                onHide={modifyFailureModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>?????? ??????</Modal.Title>
                    <Button variant="secondary" onClick={modifyFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ADMIN??? ?????? ??????
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyFailureModalClose}>
                        ??????
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal
                show={deleteConfirmModalShow}
                onHide={deleteConfirmModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>?????????????????????????</Modal.Title>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ?????? ??? ?????? ???????????? ???????????????.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteConfirmModalClose}>
                        ??????
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
                        ??????
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
                    <Modal.Title>?????? ??????</Modal.Title>
                    <Button variant="secondary" onClick={deleteFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ADMIN??? ?????? ??????
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteFailureModalClose}>
                        ??????
                    </Button>
                </Modal.Footer>
            </Modal>

            {isLoading ? <PreLoader/> : ''}
        </>
    )
        ;
}

export default ProductDetails;