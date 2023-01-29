import React, {useEffect, useRef, useState} from 'react';
import Blog from "./Blog";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import $ from "jquery";
import BlogPaginationTop from "./BlogPaginationTop";
import BlogPaginationBottom from "./BlogPaginationBottom";
import PreLoader from "../../PreLoader/PreLoader";

function BlogList(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [params, setParams] = useSearchParams()

    const [size, setSize] = useState(6)
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()
    const [end, setEnd] = useState()
    const [start, setStart] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(0)
    const scrollRef = useRef()
    const getBlogs = async () => {
        try {
            setIsLoading(true)
            let category = params.get('category')
            if (category === null) {
                category = ''
            }
            let keyword = params.get('keyword')
            if (keyword === null) {
                keyword = ''
            }
            const response = await axios.get(`http://seol.site:9000/api/blog/list?category=${category}&keyword=${keyword}&sort=${sort}&page=${page}`)
            const data = response.data
            if (data.dtoList === null) {
                setBlogs([])
            } else {
                setBlogs(data.dtoList)
            }
            setIsLoading(false)
            setPrev(data.prev)
            setNext(data.next)
            setEnd(data.end)
            setStart(data.start)
            setTotal(data.total)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
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
        getBlogs()
    }, [params, page, sort])

    //목록변경(쿼리스트링변경)시 페이지를 1로 초기화해야함
    useEffect(() => {
        setPage(1)
    }, [params]);

    return (
        <>
            <div ref={scrollRef} className="col-lg-8 col-md-7">
                <div className="filter__found">
                    {total > 0 ? <h6><span>{total}</span> 개의 게시글이 있습니다.</h6> : <h6><span>게시글이 없습니다</span></h6>}
                </div>
                {blogs.length > 0 ?
                    <BlogPaginationTop start={start} page={page} end={end} prev={prev} next={next} movePage={movePage}
                                       nextPage={nextPage} prevPage={prevPage} blogs={blogs}/> : ''}
                <br/>
                <div className="row">
                    {blogs.map((blog) => (
                        <Blog key={blog.bid} blog={blog}/>
                    ))}
                </div>
                {blogs.length > 0 ? <BlogPaginationBottom start={start} page={page} end={end} prev={prev} next={next}
                                                          movePage={movePage}
                                                          nextPage={nextPage} prevPage={prevPage} blogs={blogs}/> : ''}
            </div>
            {isLoading ? <PreLoader/> : ''}
        </>
    );
}

export default BlogList;