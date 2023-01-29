


import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import PreLoader from "../PreLoader/PreLoader";
import {setLogin} from "../../store/loginSlice";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";

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
    const {title, text, fileName, mid, memberFileName, roleSet, category} = props.blog
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [params, setParams] = useSearchParams()
    const bid = params.get("bid")


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

    const [blog , setBlog] = useState({
        bid : bid,
        title : title,
        text : text,
        fileName : [fileName],
        mid : mid,
        category : category
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

    const modifyBlog = async () => {
        try {
            setIsLoading(true)
            const response = await axios.put(`http://localhost:9000/api/blog/authentication/${bid}`, blog)
            setIsLoading(false)
            setModifySuccessModalShow(true)
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
                const accessToken = response.data.accessToken;
                axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken
                dispatch(setLogin(accessToken))
                return modifyBlog()
            }
            if (e.response.data.error === 'Forbidden') {
                setModifyFailureModalShow(true)
            }
            setIsLoading(false)
        }finally {
            for (const deletedImage of imageDeleteList) {
                await axios.delete(deletedImage)
            }
        }
    }

    const deleteBlog = async () => {
        try {
            setIsLoading(true)
            await axios.post("http://localhost:9000/api/blog/authentication/delete", props.blog)
            setDeleteConfirmModalShow(false)
            setIsLoading(false)
            navigate('/blog')
        } catch (e) {
            if (e.response.data.msg === 'Expired Token') {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:9000/api/token/getAccessToken")
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

    const [modifySuccessModalShow, setModifySuccessModalShow] = useState(false)
    const modifySuccessModalClose = () => {
        setModifySuccessModalShow(false)
        navigate(`/blog-details?bid=${blog.bid}`)
    }

    const [modifyFailureModalShow, setModifyFailureModalShow] = useState(false)
    const modifyFailureModalClose = () => {
        setModifyFailureModalShow(false)
    }

    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false)
    const deleteConfirmModalClose = () => {
        setDeleteConfirmModalShow(false)
    }

    const [deleteFailureModalShow, setDeleteFailureModalShow] = useState(false)
    const deleteFailureModalClose = () => {
        setDeleteFailureModalShow(false)
    }
    const [imageUploadModalShow, setImageUploadModalShow] = useState(false)
    const imageUploadModalClose = () => {
        setImageUploadModalShow(false)
    }

    let file = []
    fileName === null ? file = [] : file = [fileName]
    const [imageList, setImageList] = useState(file)

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
    const [imageDeleteList, setImageDeleteList] = useState([])
    const deleteImage = async (obj) => {
        setImageDeleteList([...imageDeleteList, obj])
        setImageList([])
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
                    <option value={"0"} selected={category === 0}>뷰티</option>
                    <option value={"1"} selected={category === 1}>음식</option>
                    <option value={"2"} selected={category === 2}>생활/건강</option>
                    <option value={"3"} selected={category === 3}>여행</option>
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
                                    <span>{role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{display: "flex", alignItems: 'center', justifyContent: 'end'}}>
                            <div className="blog__details__widget">
                                <ul>
                                    <Link to={`/blog-details?bid=${bid}`} ><Button variant={"secondary"} style={{marginBottom : '5px'}}>이전으로</Button></Link>
                                    <br />
                                    <Button variant={"danger"} style={{marginBottom : '5px'}} onClick={() => setDeleteConfirmModalShow(true)}>삭제하기</Button>
                                    <br />
                                    <Button variant={"primary"} onClick={modifyBlog} style={{float: 'right'}}>수정완료</Button>
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
                show={modifySuccessModalShow}
                onHide={modifySuccessModalClose}
                keyboard={false}
                size={"sm"}
                centered
            >
                <Modal.Header>
                    <Modal.Title>수정 성공</Modal.Title>
                    <Button variant="secondary" onClick={modifySuccessModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    수정되었습니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifySuccessModalClose}>
                        닫기
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
                    <Modal.Title>수정 실패</Modal.Title>
                    <Button variant="secondary" onClick={modifyFailureModalClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    ADMIN만 수정 가능
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modifyFailureModalClose}>
                        닫기
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