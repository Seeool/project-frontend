import React, {createRef, useEffect, useRef, useState} from 'react';
import $ from 'jquery'

const ProductPagination = (props) => {
    const {start, page, end, movePage, nextPage, prevPage, next, prev } = props
    const [rerender, setRerender] = useState(false)

    let array = []
    for (let i = start; i <= end; i++) {
        array.push(i)
    }
    const refs = array.map(() => createRef())
    const prevBtn = useRef()
    const nextBtn = useRef()

    useEffect(() => {
        if (prev) {prevBtn.current.style.display = 'inline-block'}
        else {prevBtn.current.style.display = 'none'}
        if (next) {nextBtn.current.style.display = 'inline-block'}
        else {nextBtn.current.style.display = 'none'}
    },[start])

    useEffect(() => {
        console.log(refs[page])
    }, []);


    return (
        <div className="product__pagination">
            <a ref={prevBtn} href="#" onClick={prevPage} >이전</a>
            {array.map((i) => (
                <a className={page === i ? "active" : ""} ref={refs[i]} href="#" key={i} onClick={movePage}>{i}</a>
            ))}
            <a ref={nextBtn}  href="#" onClick={nextPage} >다음</a>
        </div>
    );
};

export default ProductPagination;
