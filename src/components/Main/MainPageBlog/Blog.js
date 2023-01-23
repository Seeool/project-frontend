import React from 'react';
import {Link} from "react-router-dom";

function Blog(props) {
    const {title, fileName, regDate, replyCount} = props.blog
    const date = new Date(regDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="blog__item">
                <div className="blog__item__pic">
                    <img src={fileName} alt=""/>
                </div>
                <div className="blog__item__text">
                    <ul>
                        <li><i className="fa fa-calendar-o"></i> {year}년 {month}월 {day}일</li>
                        <li><i className="fa fa-comment-o"></i> {replyCount}</li>
                    </ul>
                    <h5><Link to="/blog">{title}</Link></h5>
                </div>
            </div>
        </div>
    );
}

export default Blog;