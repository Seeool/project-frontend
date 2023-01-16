import React from 'react';

function BlogBanner(props) {
    const {id, title, writer, date, replyCount, category} = props.blog

    return (
        <section className="blog-details-hero set-bg" data-setbg="img/blog/details/details-hero.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="blog__details__hero__text">
                            <h2>{title}</h2>
                            <ul>
                                <li>{writer}</li>
                                <li>{date}</li>
                                <li>{replyCount} 댓글</li>
                                <li>카테고리 : {category}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogBanner;