import React from 'react';
import Blogs from "./Blogs";

function MainPageBlog(props) {
    const blogs = [
        {
            id: 1,
            title: '테스트 타이틀1',
            picUrl: 'img/blog/blog-1.jpg',
            date: 'May 4,2019',
            replyCount: 5
        },
        {
            id: 2,
            title: '테스트 타이틀2',
            picUrl: 'img/blog/blog-2.jpg',
            date: 'May 5,2020',
            replyCount: 6
        },
        {
            id: 3,
            title: '테스트 타이틀3',
            picUrl: 'img/blog/blog-3.jpg',
            date: 'May 6,2021',
            replyCount: 7
        }
    ]
    return (
        <section className="from-blog spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title from-blog__title">
                            <h2>블로그</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogs.map((blog) => (
                        <Blogs key={blog.id} blog={blog}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MainPageBlog;