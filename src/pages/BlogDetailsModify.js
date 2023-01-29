import React, {useEffect, useRef, useState} from 'react';
import BlogSideBar from "../components/BlogDetails/BlogSideBar";
import BlogBanner from "../components/BlogDetails/BlogBanner";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import BlogSection from "../components/BlogDetails/BlogSection";
import BlogSectionModify from "../components/BlogDetails/BlogSectionModify";

function BlogDetails(props) {
    const [blog, setBlog] = useState();
    const [params, setParams] = useSearchParams()
    const bid = params.get('bid')
    const getBlog = async () => {
        const response = await axios.get(`http://localhost:9000/api/blog/${bid}`)
        const data = response.data
        console.log(data)
        setBlog(data)
    }

    useEffect(() => {
        getBlog()
    },[])

    return (
        <>
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        {blog !== undefined ? <BlogSectionModify blog={blog}/> : ''}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetails;