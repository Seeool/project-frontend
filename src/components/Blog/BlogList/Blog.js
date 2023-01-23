import React from 'react';

function Blog(props) {
    const {title, date, replyCount, fileName} = props.blog
    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="blog__item">
                <div className="blog__item__pic">
                    <img src={fileName} alt=""/>
                </div>
                <div className="blog__item__text">
                    <ul>
                        <li><i className="fa fa-calendar-o"></i> {date}</li>
                        <li><i className="fa fa-comment-o"></i> {replyCount}</li>
                    </ul>
                    <h5><a href="src/components/Blog/BlogList#">{title}</a></h5>
                    <a href="src/components/Blog/BlogList#" className="blog__btn"
                    >READ MORE <span className="arrow_right"></span
                    ></a>
                </div>
            </div>
        </div>
    );
}

export default Blog;