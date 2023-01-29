import React, {useEffect, useRef, useState} from 'react';
import BlogSideBar from "../components/BlogDetails/BlogSideBar";
import BlogBanner from "../components/BlogDetails/BlogBanner";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import BlogSection from "../components/BlogDetails/BlogSection";
import BlogSectionCreate from "../components/BlogDetails/BlogSectionCreate";
import {useSelector} from "react-redux";

function BlogDetailsCreate(props) {
    const userRole = useSelector(store => store.user.userRole)
    const navigate = useNavigate()
    useEffect(() => {
        if (userRole !== "ADMIN" && userRole !== "MANAGER") {
            navigate("/")
        }
    },[])
    return (
        <>
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <BlogSectionCreate/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetailsCreate;