


import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import PreLoader from "../PreLoader/PreLoader";
import {setLogin} from "../../store/loginSlice";
import {useNavigate} from "react-router-dom";

const StyledTextarea = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 16px;
  color: #6f6f6f;
  overflow: hidden;
`
const TextAreaH3 = styled.textarea`
  width: 100%;
  font-weight: 600;
  resize: none;
  overflow: hidden;
`
const ImageRemoveBtn = styled.button`
  position: absolute;
  right: 0px;
`

function BlogSection(props) {
    const [isLoading, setIsLoading] = useState(false)
    const mid = useSelector(store => store.user.mid)
    const userRole = useSelector(store => store.user.userRole)
    const memberFileName = useSelector(store => store.user.fileName)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [blog , setBlog] = useState({
        bid : '',
        title : '',
        text : '',
        fileName : '',
        mid : mid,
        category : `0`
    })
    const setCategory = (e) => {
        setBlog({...blog, category: e.target.value})
    }

    const textareaH3 = useRef();
    const textareaP = useRef();

    const handleResizeHeightH3 = (e) => {
        setBlog({...blog, [e.target.name]: e.target.value})
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
    };
    const handleResizeHeightP = (e) => {
        setBlog({...blog, [e.target.name]: e.target.value})
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    };

    useEffect(() => {
        textareaH3.current.style.height = 'auto'; //height 초기화
        textareaH3.current.style.height = textareaH3.current.scrollHeight + 'px';
        textareaP.current.style.height = 'auto'; //height 초기화
        textareaP.current.style.height = textareaP.current.scrollHeight + 'px';
    }, [props.blog])

    const createBlog = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`http://localhost:9000/api/blog/authentication/create`, blog)
            setBlog({...blog, bid: response.data.bid}) // 리디렉트를 위한것
            setCreateSuccessModalShow(true)
            setIsLoading(false)

        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return createBlog()
            }
            if (e.response.data.error === 'Forbidden') {
                setCreateFailureModalShow(true)
            }
            setIsLoading(false)
        }
    }
    const [createSuccessModalShow, setCreateSuccessModalShow] = useState(false)
    const createSuccessModalClose = () => {
        setCreateSuccessModalShow(false)
        navigate(`/blog-details?bid=${blog.bid}`)
    }

    const [createFailureModalShow, setCreateFailureModalShow] = useState(false)
    const createFailureModalClose = () => {
        setCreateFailureModalShow(false)
    }
    const [imageUploadModalShow, setImageUploadModalShow] = useState(false)
    const imageUploadModalClose = () => {
        setImageUploadModalShow(false)
    }

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
                url: "http://localhost:9000/upload",
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
        setBlog({...blog, fileName: imageList[0]})
    },[imageList])


    return (
        <>
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
                <h2>이미지 첨부</h2>
                <Button variant={"primary"} onClick={() => setImageUploadModalShow(true)} disabled={imageList.length >= 1}>이미지 첨부</Button>
                <div className="blog__details__text">
                    {imageList.map((fileName, index) => (
                        <div key={index} style={{display: 'block', position: 'relative'}}>
                            <ImageRemoveBtn onClick={() => deleteImage(fileName)}>X</ImageRemoveBtn>
                            <img src={fileName} alt="" />
                        </div>
                    ))}
                    카테고리 : <select onChange={setCategory}>
                    <option value={"0"}>뷰티</option>
                    <option value={"1"}>음식</option>
                    <option value={"2"}>생활/건강</option>
                    <option value={"3"}>여행</option>
                </select> <br/>
                    <h3>제목 : <TextAreaH3 rows={1} name={"title"} ref={textareaH3} value={blog.title} onChange={handleResizeHeightH3} /></h3>
                    <p>본문 : <StyledTextarea rows={1} name={"text"} ref={textareaP} value={blog.text} onChange={handleResizeHeightP} ></StyledTextarea></p>

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
                                    <span>{userRole}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{display: "flex", alignItems: 'center', justifyContent: 'end'}}>
                            <div className="blog__details__widget">
                                <ul>
                                    <Button variant={"primary"} onClick={createBlog} style={{float: 'right'}}>등록하기</Button>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                        <Form.Control className={"fileUploader"} name={"fileNames"} type="file" accept='image/*' />
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

            {isLoading ? <PreLoader/> : ''}
        </>
    );
}

export default BlogSection;