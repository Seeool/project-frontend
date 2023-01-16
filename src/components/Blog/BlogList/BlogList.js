import React from 'react';
import Blog from "./Blog";

function BlogList(props) {
    const blogs = [
        {
            id: 1,
            title: '테스트1 제목',
            date: 'May 4,2019',
            replyCount: 5,
            picUrl: 'img/02.jpg'
        },
        {
            id: 2,
            title: '테스트2 제목',
            date: 'May 4,2019',
            replyCount: 6,
            picUrl: 'img/blog/blog-2.jpg'
        },
        {
            id: 3,
            title: '테스트3 제목',
            date: 'May 4,2019',
            replyCount: 7,
            picUrl: 'img/blog/blog-3.jpg'
        },
        {
            id: 4,
            title: '테스트4 제목',
            date: 'May 4,2019',
            replyCount: 8,
            picUrl: 'img/blog/blog-4.jpg'
        }
    ]
    return (
        <div className="col-lg-8 col-md-7">
            <div className="row">
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog}/>
                ))}

            </div>
        </div>
    );
}

export default BlogList;