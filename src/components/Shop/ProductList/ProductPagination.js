import React, {createRef, useEffect, useRef, useState} from 'react';
import $ from 'jquery'
import {useSearchParams} from "react-router-dom";

const ProductPagination = (props) => {
    const {start, page, end, prev, next, movePage, nextPage, prevPage, products } = props

    let array = []
    for (let i = 0; i <= end - start; i++) {
        array.push(i)
    }
    const refs = array.map(() => createRef())

    const prevBtn = useRef()
    const nextBtn = useRef()


    const [render, setRender] = useState(false)
    const test = () => {
        console.log("test 실행됨")
        setRender(!render)
    }

    useEffect(() => {
        console.log()
        if (prev) {prevBtn.current.style.display = 'inline-block'}
        else {prevBtn.current.style.display = 'none'}
        if (next) {nextBtn.current.style.display = 'inline-block'}
        else {nextBtn.current.style.display = 'none'}
        refs.map(ref => {
            ref.current.classList.remove('active')
        })
        refs[page-start]?.current.classList.add('active')
    }, [products])


    return (
        <div className="product__pagination">
            <a ref={prevBtn} href="#" onClick={prevPage} ><i className="fa fa-long-arrow-left"></i></a>
            {array.map((i) => (
                <a ref={refs[i]} href="#" key={i} onClick={movePage}>{i + start}</a>
            ))}
            <a ref={nextBtn}  href="#" onClick={nextPage} ><i className="fa fa-long-arrow-right"></i></a>
        </div>
    );
};

export default ProductPagination;
