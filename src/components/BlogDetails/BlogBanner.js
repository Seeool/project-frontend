import React, {useEffect, useRef} from 'react';

function BlogBanner(props) {
    const {title, mid, regDate, replyCount, category} = props.blog
    const date = new Date(regDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const ref = useRef()
    
    const categories = ["뷰티", "음식", "생활/건강", "여행"]
    
    useEffect(() => {
        ref.current.scrollIntoView({behavior: 'smooth'})
    },[])

    return (
        <section ref={ref} className="blog-details-hero set-bg" style={{backgroundImage : 'url("img/blog/details/details-hero.jpg")'}} >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="blog__details__hero__text">
                            <h2>{title}</h2>
                            <ul>
                                <li>글쓴이 : {mid}</li>
                                <li>{year}년 {month}월 {day}일</li>
                                <li>{replyCount} 댓글</li>
                                <li>카테고리 : {categories[category]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogBanner;