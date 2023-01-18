import React from 'react';
import {Link} from "react-router-dom";

function Blog(props) {
    const {picUrl, date, replyCount, title} = props.blog
    return (
        <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="blog__item">
                <div className="blog__item__pic">
                    <img src={picUrl} alt=""/>
                </div>
                <div className="blog__item__text">
                    <ul>
                        <li><i className="fa fa-calendar-o"></i> {date}</li>
                        <li><i className="fa fa-comment-o"></i> {replyCount}</li>
                    </ul>
                    <h5><Link to="/blog">{title}</Link></h5>
                </div>
            </div>
        </div>
    );
}

export default Blog;