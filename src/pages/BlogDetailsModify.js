import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import BlogSectionModify from "../components/BlogDetails/BlogSectionModify";
import {useSelector} from "react-redux";

function BlogDetailsModify(props) {
    const userRole = useSelector(store => store.user.userRole)
    const navigate = useNavigate()
    useEffect(() => {
        if (userRole !== "ADMIN" && userRole !== "MANAGER") {
            navigate("/")
        }
    },[])

    const [blog, setBlog] = useState();
    const [params, setParams] = useSearchParams()
    const bid = params.get('bid')
    const getBlog = async () => {
        const response = await axios.get(`http://localhost:9000/api/blog/${bid}`)
        const data = response.data
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

export default BlogDetailsModify;