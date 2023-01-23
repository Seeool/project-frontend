import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import $ from "jquery";
import Review from "./Review";
import ReviewPagination from "./ReviewPagination";

function ProductReviews(props) {
    const [params, setParams] = useSearchParams()
    const [reviews, setReviews] = useState([]);
    const pid = params.get("pid")
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
            alert(err)
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

    useEffect(() => {
        getReviews()
    }, [page])

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
                                <Review key={review.reviewNo} review={review}/>
                            )) : <h6 style={{textAlign: 'center'}}>리뷰가 없습니다</h6>}
                        </div>
                    </div>
                    {reviews.length > 0 ? <ReviewPagination start={start} page={page} end={end} prev={prev} next={next}
                                                            movePage={movePage} nextPage={nextPage} prevPage={prevPage}
                                                            reviews={reviews}/> : ''}
                </div>
            </div>
        </>
    );
}


export default ProductReviews;