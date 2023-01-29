import React, {useEffect, useState} from 'react';
import Blog from "./Blog";
import axios, {get} from "axios";
import PreLoader from "../../PreLoader/PreLoader";

function MainPageBlogList(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://seol.site:9000/api/blog/latestList")
            setBlogs(response.data);
            setIsLoading(false)
        } catch (e) {
            alert(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])


    return (
        <>
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
                            <Blog key={blog.bid} blog={blog}/>
                        ))}
                    </div>
                </div>
            </section>
            {isLoading ? <PreLoader/> : ''}
        </>

    );
}

export default MainPageBlogList;